import styles from "./Block.module.css";

type BlockProps = {
  id: string;
  name: string;
};

function Block({ id, name }: BlockProps) {
  return (
    <li key={id} className={styles.block}>
      {name}
    </li>
  );
}

export default Block;
