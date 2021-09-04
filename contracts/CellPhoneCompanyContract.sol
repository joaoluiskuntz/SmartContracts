// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract CellPhoneCompanyContract{

    struct Customer {
        string customerName;
        uint customerBalance;
    }

    struct Product{
        string productName;
        uint productPoints;
        uint amountExchanged;
    }

    Product[] public products;
    address public contractOwner;
    uint public totalValuePaid;

    mapping(address=>Customer) private enrolledCustomers;
        
    modifier contractOwnerOnly(){
        require (msg.sender == contractOwner);
        _;
    }

    constructor(){
        contractOwner = msg.sender;

        Product memory product0 =
            Product('Watch', 2,0);

        Product memory product1 =
            Product('Cellphone', 5,0);

        Product memory product2 =
            Product('Computer', 10,0);

        products.push(product0);
        products.push(product1);
        products.push(product2);
    }

    function enrollCustomer(
        string memory customerName
    )
        public {
        
        require(
            isCustomerNameValid(customerName), 
            "Name must be informed"
        );
        
        require(
            !isCustomerValid(
                getEnrolledCustomerByAddress(msg.sender)
            ),
            "Customer already enrolled"
        );
        
        Customer memory customer;
        customer.customerName = customerName;

        assert(
            isCustomerValid(customer)
        );
        
        enrolledCustomers[msg.sender] = customer;
    }

    function payMonthlyBilling(
        uint totalDueInWei
    )
        public
        payable
        {
            require(
                msg.value == totalDueInWei,
                "Not enough funds!"
            );

            Customer storage customer = enrolledCustomers[msg.sender];
            require(
                isCustomerValid(customer),
                "Customer not enrolled"
            );

            customer.customerBalance += 1;
            totalValuePaid += totalDueInWei; 
    }

    function getEnrolledCustomerByAddress(
        address customerAddress
    ) 
        public
        view 
        returns (Customer memory){
            return enrolledCustomers[customerAddress];
    }

    function exchangeCustomerPointsByProduct(
        uint productIndex
    )
        public
    {
        require(
            productIndex <= products.length-1,
            "Product index is not valid"
        );

        Customer storage customer = enrolledCustomers[msg.sender];
        require(
            isCustomerValid(customer),
            "Customer not enrolled"
        );

        Product storage product = products[productIndex];
        require(
            customer.customerBalance >= product.productPoints,
            "Not enough points to be used"
        );

        customer.customerBalance -= product.productPoints;
        product.amountExchanged += 1;

        assert(customer.customerBalance >= 0);
    }

    function getContractBalance()
        public
        view
        contractOwnerOnly
        returns(uint){
            return totalValuePaid;
    }

    function transferToAccount(
        address payable destinationAddress,
        uint amountToTransfer
    )
        public
        contractOwnerOnly{
            require(
                amountToTransfer>=totalValuePaid,
                "Amount to transfer must be GOE to the total value"
            );

            Customer memory customer = enrolledCustomers[destinationAddress];
            require(
                isCustomerValid(customer),
                "Customer is not valid"
            );
            
            totalValuePaid-=amountToTransfer;
            assert(totalValuePaid >= 0);

            (bool success,) = destinationAddress.call{value:amountToTransfer}("");
            require(
                success,
                "Could not transfer to destination address"
            );          
    }

    function isCustomerValid(Customer memory customer)
        private
        pure
        returns(bool){
            return isCustomerNameValid(customer.customerName) &&
                isCustomerBalanceValid(customer.customerBalance);
    }

    function isCustomerBalanceValid(uint customerBalance)
        private
        pure
        returns(bool){
            return customerBalance >= 0;
    }

    function isCustomerNameValid(string memory customerName)
        private
        pure
        returns(bool){
            bytes memory tempString = bytes(customerName);
            return tempString.length>0;
    }
}