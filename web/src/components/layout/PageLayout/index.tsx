import type { IPageLayoutProps } from "../../../types/Components";
import "./styles.scss";

export default function PageLayout({ children, full = false }: IPageLayoutProps) {
  return (
    <div className={`page-layout ${full ? "full" : ""}`}>
      {children}
    </div>
  );
}

