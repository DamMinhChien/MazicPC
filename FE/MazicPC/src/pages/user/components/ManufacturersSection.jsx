import { Container } from "react-bootstrap";
import styles from "./ManufacturersSection.module.css";
import { Link } from "react-router-dom";

export default function ManufacturersSection({ manufacturers }) {
  return (
    <>
      <hr />
      <section className={styles.manufacturersSection}>
        <Container className={styles.manufacturersContainer}>
          {manufacturers.map((m) => (
            <div key={m.id} className={styles.manufacturerItem}>
              <Link className="no-underline" to={m.website}>
                <img
                  src={m.logoUrl}
                  alt={m.name}
                  className={styles.manufacturerLogo}
                />
              </Link>
            </div>
          ))}
        </Container>
      </section>
      <hr />
    </>
  );
}
