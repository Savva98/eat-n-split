import { useState } from "react";

export default function FormAddFriend({
  onAddingFriend,
  onSetFriend,
}) {
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
