export default function Footer() {
  const styles = {
    title: "text-gray-50 mb-4 text-xl",
    link: "text-stone-500 my-2",
  };
  return (
    <footer className="bg-[#181414] italic">
      <section className="flex justify-between mx-auto py-16 max-w-4xl">
        {" "}
        <div>
          <h4 className={styles.title}>CUSTOMER SERVICE</h4>
          <ul>
            <li>
              <a href="#" className={styles.link}>
                Help & Contact Us
              </a>
            </li>
            <li>
              {" "}
              <a href="#" className={styles.link}>
                Return & Refunds
              </a>
            </li>
            <li>
              {" "}
              <a href="#" className={styles.link}>
                Online Stores
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Term & Conditions
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className={styles.title}>COMPANY</h4>
          <ul>
            <li>
              <a href="#" className={styles.link}>
                What We Do
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Available Service
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Latest Posts
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className={styles.title}>SOCIAL MEDIA</h4>
          <ul>
            <li>
              <a href="#" className={styles.link}>
                Twitter
              </a>
            </li>
            <li>
              {" "}
              <a href="#" className={styles.link}>
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Pinterest
              </a>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
}
