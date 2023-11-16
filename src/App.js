import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [addFriend, setAddFriend] = useState(false);
  const [selectFriend, setSelect] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState([]);
  console.log(selectedFriend);

  function addingFriend(frien) {
    setFriends((friends) => [...friends, frien]);
  }
  function onSetFriend() {
    setAddFriend(!addFriend);
  }

  function onSelectFriend(obj) {
    setSelect(!selectFriend);
    if (obj.id !== selectedFriend.id && selectedFriend.id) {
      setSelect((s) => {
        if (!s) {
          return !s;
        }
        return s;
      });
      setSelectedFriend(obj);
    }
    setSelectedFriend(obj);
  }

  function onChangeBalance(value) {
    setFriends((friend) =>
      friend.map((f) =>
        f.id === selectedFriend.id
          ? { ...f, balance: f.balance + value }
          : f
      )
    );

    setSelect(!selectFriend);
  }
  return (
    <div className="app">
      <SideBar
        friends={friends}
        onSetAddFriend={onSetFriend}
        onSelectFriend={onSelectFriend}
      />

      {selectFriend ? (
        <FormSplitABill
          selectedFriend={selectedFriend}
          onChangeBalance={onChangeBalance}
        />
      ) : null}
      {addFriend ? (
        <FormAddFriend
          onAddingFriend={addingFriend}
          onSetFriend={onSetFriend}
        />
      ) : null}
    </div>
  );
}

function SideBar({
  friends,
  onSetAddFriend,
  onSelectFriend,
}) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friends
            friendsObj={friend}
            key={friend.id}
            onSelectFriend={onSelectFriend}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </ul>
      <button className="button" onClick={onSetAddFriend}>
        Add friend
      </button>
    </div>
  );
}

function Friends({
  friendsObj,
  onSelectFriend,
  selected,
  setSelected,
}) {
  let content;
  const isSelected = selected === friendsObj.id;
  function handleSelected(frien) {
    onSelectFriend(frien);
    setSelected(isSelected ? 0 : frien.id);
  }
  if (friendsObj.balance > 0) {
    content = `${friendsObj.name} ownes you ${friendsObj.balance}$`;
  }

  if (friendsObj.balance < 0) {
    content = `You owne ${friendsObj.name} ${Math.abs(
      friendsObj.balance
    )}$`;
  }
  if (friendsObj.balance === 0 || !friendsObj.balance) {
    content = `You and ${friendsObj.name} are both even`;
  }
  return (
    <li>
      <img src={friendsObj.image} alt={friendsObj.name} />
      <h3>{friendsObj.name}</h3>
      <p>{content}</p>
      <button
        className="button"
        onClick={() => handleSelected(friendsObj)}
      >
        {!isSelected ? "Select" : "Closed"}
      </button>
    </li>
  );
}

function FormSplitABill({
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

function FormAddFriend({ onAddingFriend, onSetFriend }) {
  const [friendName, setFriendName] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  function submition(e) {
    e.preventDefault();
    if (!friendName || !imageSrc) return;

    const newFriendObj = {
      name: friendName,
      image: imageSrc,
      id: Date.now(),
    };

    onAddingFriend(newFriendObj);
    onSetFriend();
    setFriendName("");
    setImageSrc("");
  }

  return (
    <div>
      <form
        className="form-add-friend"
        onSubmit={(e) => submition(e)}
      >
        <p>Friend name</p>
        <input
          type="text"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        ></input>
        <p>Image URL</p>
        <input
          type="text"
          value={imageSrc}
          placeholder="https://i.pravatar.cc/48?u=499476"
          onChange={(e) => setImageSrc(e.target.value)}
        ></input>
        <button className="button">Add</button>
      </form>
      <button className="button" onClick={onSetFriend}>
        Close
      </button>
    </div>
  );
}
