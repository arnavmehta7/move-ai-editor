import json
import os
import traceback
from dotenv import load_dotenv
import uuid
from typing import List
from fastapi import FastAPI, HTTPException, Path, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import subprocess

load_dotenv()

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
app = FastAPI()

# Setup CORS
origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/health')
async def health():
    return {"status": "ok"}

# Endpoint to test if the Testcases run
class TestCasePayload(BaseModel):
    code: str

@app.post('/test-unit')
async def test(req: TestCasePayload):
    try:
        # Define the file path
        file_path = "move/sources/test_code.move"
        
        # Save the code to a file
        with open(file_path, "w") as file:
            file.write(req.code)
        
        result = subprocess.run(
            "cd move && aptos move test",
            capture_output=True,
            text=True,
            shell=True
        )
        print(result.stdout)
        
        # Return the logs
        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



class QueryPayload(BaseModel):
    query: str

@app.post('/answer-query')
async def answer_query(req: QueryPayload):
    try:
        with open("prompt.txt") as f:
            chat_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": f.read()},
                    {
                        "role": "user",
                        "content": req.query + "Start name of module with `module hello_blockchain::<fn>` and make sure to have tests.",
                    }
                ],
                model="gpt-4o",
                response_format={ "type": "json_object" }
            )
            output = chat_completion.choices[0].message.content
            print(output)
            response = json.loads(output)["output"]
            extracted_code = ""
            if "```" in response:
                extracted_code = response.split("```")[1].strip().replace("move\n", "").strip()
            
            return {
                "response": response,
                "extracted_code": extracted_code
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)+traceback.format_exc())


if __name__ == "__main__":
    import uvicorn
    try:
        uvicorn.run(app, host="0.0.0.0", port=8000)
    except Exception as e:
        print(e, traceback.format_exc())
