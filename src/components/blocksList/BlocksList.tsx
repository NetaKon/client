import styles from "./BlocksList.module.css";
import { useEffect, useState } from "react";
import Block from "./block/Block";
import { Link } from "react-router-dom";

function BlocksList() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/api/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setBlocks(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <ul className={styles.blocks}>
      {blocks.map(({ id, title }) => (
        <Link to={id} key={id}>
          <Block id={id} name={title} />
        </Link>
      ))}
    </ul>
  );
}

export default BlocksList;
