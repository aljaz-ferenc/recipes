import { useEffect, useState } from "react";
import "./ShoppingList.scss";
import { addShoppingItem, getUser, removeShoppingItem } from "../api/api";
import { useSelector } from "react-redux";

export default function ShoppingList() {
  const [items, setItems] = useState(null);
  const [input, setInput] = useState("");
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    if (!userId) return;
    getUser(userId).then((user) => setItems(user.shopping_list));
  }, [userId]);

  async function handleAddItem() {
    if (!input) return;
    await addShoppingItem(userId, input);
    getUser(userId).then((user) => setItems(user.shopping_list));
    setInput("");
    console.log("added");
  }

  async function handleRemoveItem(item) {
    await removeShoppingItem(userId, item);
    getUser(userId).then((user) => setItems(user.shopping_list));
  }

  return (
    <div className="shopping-list">
      <h3>My Shopping List</h3>
      <div className="shopping-list__add-item">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
        <button onClick={handleAddItem}>Add to list</button>
      </div>
      <div className="shopping-list__list">
        {items &&
          items.map((item, i) => (
            <ShoppingListItem
              handleRemoveItem={handleRemoveItem}
              key={i}
              index={i}
              item={item}
            />
          ))}
      </div>
    </div>
  );
}

function ShoppingListItem({ item, index, handleRemoveItem }) {
  const [isChecked, setIsChecked] = useState(false);
  const userId = useSelector((state) => state.user.id);

  function handleCheck(e) {
    setIsChecked(e.target.checked);
  }

  return (
    <div className="shopping-list__item">
      <label htmlFor={index} className={isChecked ? "line-through" : ""}>
        {item}
      </label>
      <input
        className="checkbox"
        id={index}
        onChange={handleCheck}
        type="checkbox"
      />
      <DeleteIcon
        handleRemoveItem={handleRemoveItem}
        userId={userId}
        item={item}
      />
    </div>
  );
}

function DeleteIcon({ item, handleRemoveItem }) {
  function handleDeleteItem() {
    handleRemoveItem(item);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      onClick={handleDeleteItem}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}
