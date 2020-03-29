import React, {
  useEffect,
  FC,
  CSSProperties
} from "react";

import Welcome from "./Welcome";

import { Customer, Order, Review } from "../types";

interface CustomerData {
  [key: string]: Customer;
}

interface State {
  nbNewOrders?: number;
  nbPendingReviews?: number;
  pendingOrders?: Order[];
  pendingOrdersCustomers?: CustomerData;
  pendingReviews?: Review[];
  pendingReviewsCustomers?: CustomerData;
  revenue?: number;
}

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "1em" },
  rightCol: { flex: 1, marginLeft: "1em" },
  singleCol: { marginTop: "2em", marginBottom: "2em" }
};

const Dashboard: FC = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <div style={{ marginBottom: "2em" }}>
          <Welcome />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
