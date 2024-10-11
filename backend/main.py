import os
import traceback
from dotenv import load_dotenv
import uuid
from typing import List
from fastapi import FastAPI, HTTPException, Path, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import subprocess

load_dotenv()

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

if __name__ == "__main__":
    import uvicorn
    try:
        uvicorn.run(app, host="0.0.0.0", port=8000)
    except Exception as e:
        print(e, traceback.format_exc())
