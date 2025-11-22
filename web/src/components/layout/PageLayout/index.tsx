import type { IPageLayoutProps } from "../../../types/Components";
import "./styles.scss";

export default function PageLayout({ children, centered = false }: IPageLayoutProps) {
  return (
    <div className={`page-layout ${centered ? "centered" : ""}`}>
      <div className="page-card">
        {children}
      </div>
    </div>
  );
}
