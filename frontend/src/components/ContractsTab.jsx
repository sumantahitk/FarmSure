import React, { useState } from "react";

function ContractsTab() {
  const [activeTab, setActiveTab] = useState("openContracts");

  // Manage the open contracts in state
  const [contracts, setContracts] = useState([
    {
      id: "C001",
      createdDate: "2024-09-01",
      cropName: "Wheat",
      quantity: "500kg",
      status: "Pending",
      proposedPrice: "$1000",
    },
    {
      id: "C002",
      createdDate: "2024-09-02",
      cropName: "Rice",
      quantity: "300kg",
      status: "Pending",
      proposedPrice: "$600",
    },
    {
      id: "C003",
      createdDate: "2024-09-03",
      cropName: "Maize",
      quantity: "200kg",
      status: "Approved",
      proposedPrice: "$400",
    },
    {
      id: "C004",
      createdDate: "2024-09-04",
      cropName: "Barley",
      quantity: "600kg",
      status: "Pending",
      proposedPrice: "$1200",
    },
    {
      id: "C005",
      createdDate: "2024-09-05",
      cropName: "Soybeans",
      quantity: "700kg",
      status: "Approved",
      proposedPrice: "$1400",
    },
  ]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteContract = (contractId) => {
    // Filter out the contract with the given ID
    const updatedContracts = contracts.filter(
      (contract) => contract.id !== contractId
    );
    setContracts(updatedContracts); // Update state with filtered contracts
    console.log(`Deleted contract with ID: ${contractId}`);
  };

  return (
    <div className="mt-6">
      <div className="flex border-b-2 border-gray-200">
        <button
          onClick={() => handleTabClick("openContracts")}
          className={`flex-1 text-center py-2 ${
            activeTab === "openContracts"
              ? "border-b-2 border-green-500 text-blue-500"
              : "text-black"
          }`}
        >
          Open Contracts
        </button>
        <button
          onClick={() => handleTabClick("fixedContracts")}
          className={`flex-1 text-center py-2 ${
            activeTab === "fixedContracts"
              ? "border-b-2 border-green-500 text-blue-500"
              : "text-black"
          }`}
        >
          Fixed Contracts
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "openContracts" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="px-4 py-2 text-left text-black">Contract ID</th>
                  <th className="px-4 py-2 text-left text-black">Created Date</th>
                  <th className="px-4 py-2 text-left text-black">Crop Name</th>
                  <th className="px-4 py-2 text-left text-black">Quantity</th>
                  <th className="px-4 py-2 text-left text-black">Status</th>
                  <th className="px-4 py-2 text-left text-black">Proposed Price</th>
                  <th className="px-4 py-2 text-left text-black">Delete</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract) => (
                  <tr key={contract.id}>
                    <td className="px-4 py-2 border-b text-black">{contract.id}</td>
                    <td className="px-4 py-2 border-b text-black">{contract.createdDate}</td>
                    <td className="px-4 py-2 border-b text-black">{contract.cropName}</td>
                    <td className="px-4 py-2 border-b text-black">{contract.quantity}</td>
                    <td className="px-4 py-2 border-b text-black">{contract.status}</td>
                    <td className="px-4 py-2 border-b text-black">{contract.proposedPrice}</td>
                    <td className="px-4 py-2 border-b text-black">
                      <button
                        onClick={() => handleDeleteContract(contract.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "fixedContracts" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="px-4 py-2 text-left text-black">Contract ID</th>
                  <th className="px-4 py-2 text-left text-black">Delivery Date</th>
                  <th className="px-4 py-2 text-left text-black">Final Price</th>
                  <th className="px-4 py-2 text-left text-black">Crop Name</th>
                  <th className="px-4 py-2 text-left text-black">Quantity</th>
                  <th className="px-4 py-2 text-left text-black">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b text-black">--</td>
                  <td className="px-4 py-2 border-b text-black">--</td>
                  <td className="px-4 py-2 border-b text-black">--</td>
                  <td className="px-4 py-2 border-b text-black">--</td>
                  <td className="px-4 py-2 border-b text-black">--</td>
                  <td className="px-4 py-2 border-b text-black">--</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractsTab;
