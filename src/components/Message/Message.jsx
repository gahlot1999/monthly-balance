import styles from './Message.module.css';

function Message({ children }) {
  return (
    <div className={styles.messageContainer}>
      <p>{children}</p>
    </div>
  );
}

export default Message;
