import { ReactElement } from "react";
import Private from "../components/private";

export function privatePageLayout(page: ReactElement) {
    return (
      <Private>
        {page}
      </Private>
    )
  }