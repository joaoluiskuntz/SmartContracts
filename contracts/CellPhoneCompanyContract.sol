// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

contract CellPhoneCompanyContract{

    struct Customer {
        string customerName;
        uint16 customerBalance;
    }

    struct Product{
        string productName;
        ufixed productPrice;
    }

    Product[] public products;
    address public contractOwner;

    mapping(address=>Customer) private enrolledCustomers;
        

    constructor(){
        contractOwner = msg.sender;

        Product memory product0 =
            Product('Watch', 0.5 ether);

        Product memory product1 =
            Product('Cellphone', 2.2 ether);

        Product memory product2 =
            Product('Computer', 3.5 ether);

        products.push(product0);
        products.push(product1);
        products.push(product2);
    }

    function enrollCustomer(
        string memory customerName,
        uint16 customerBalance
    )
        public {
        
        require(
            isCustomerNameValid(customerName), 
            "Name must be informed"
        );

        require(
            isCustomerBalanceValid(customerBalance), 
            "Balance must be GOE zero"
        );
        
        require(
            !isCustomerValid(
                getEnrolledCustomerByAddress(msg.sender)
            ),
            "Customer already enrolled"
        );
        
        Customer memory customer;
        customer.customerName = customerName;
        customer.customerBalance = customerBalance;

        assert(
            isCustomerValid(customer)
        );
        
        enrolledCustomers[msg.sender] = customer;
    }

    function getEnrolledCustomerByAddress(
        address customerAddress
) 
        public
        view 
        returns (Customer memory){
            return enrolledCustomers[customerAddress];
    }

    function isCustomerValid(Customer memory customer)
        private
        pure
        returns(bool){
            return isCustomerNameValid(customer.customerName) &&
                isCustomerBalanceValid(customer.customerBalance);
    }

    function isCustomerBalanceValid(uint16 customerBalance)
        private
        pure
        returns(bool){
            return customerBalance > 0;
    }

    function isCustomerNameValid(string memory customerName)
        private
        pure
        returns(bool){
            bytes memory tempString = bytes(customerName);
            return tempString.length>0;
    }
}