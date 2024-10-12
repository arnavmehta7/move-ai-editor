module hello_blockchain::add_numbers {

    public fun add(a: u64, b: u64): u64 {
        a + b
    }

    #[test]
    public fun test_add() {
        let result = add(2, 3);
        assert!(result == 5, 0);
    }
}