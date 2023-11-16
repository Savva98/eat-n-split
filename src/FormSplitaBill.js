import { useState } from "react";

export default function FormSplitABill({
  selectedFriend,
  onChangeBalance,
}) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [whoPay, setWhoPay] = useState("You");
  function setBalance(e) {
    e.preventDefault();
    if (!bill || !yourExpense) return;

    onChangeBalance(
      whoPay === "You" ? bill - yourExpense : -yourExpense
    );
  }
  return (
    <form
      className="form-split-bill"
      onSubmit={(e) => {
        setBalance(e);
      }}
    >
      <h2>split a bill with {selectedFriend.name}</h2>
      <label>Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
      <label>Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(Number(e.target.value))
        }
      ></input>
      {/* <label>{selectedFriend.name}'s expense</label>
        <input
          type="text"
          value={friendExpense}
          onChange={(e) =>
            setFriendExpense(Number(e.target.value))
          }
        ></input> */}
      <label>Who is paying the bill?</label>
      <select
        value={whoPay}
        onChange={(e) => setWhoPay(e.target.value)}
      >
        <option value="You">You</option>
        <option>{selectedFriend.name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}
