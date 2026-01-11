import { type ReactNode } from "react";
import styles from "./OnboardingLayout.module.css";

type OnboardingLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export default function OnboardingLayout({
  sidebar,
  children,
}: OnboardingLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.sidebar}>{sidebar}</div>
        <div className={styles.contentArea}>{children}</div>
      </div>
    </div>
  );
}
