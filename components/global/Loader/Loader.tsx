import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.example}>
        <div className={styles.block}>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
