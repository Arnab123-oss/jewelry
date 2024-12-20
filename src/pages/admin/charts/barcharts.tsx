import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/api/dashboardAPI";
import toast from "react-hot-toast";
import { CustomError } from "../../../types/api-types";
import { RootState } from "../../../redux/store";
import { Skeleton } from "../../../components/loader";
import { getLastMonths } from "../../../utils/features";


const {lastSixMonths,lastTwelveMonths} = getLastMonths()

const Barcharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const userId = user?._id;

  const { data, isError, isLoading, error } = useBarQuery(userId!);

  const charts = data?.charts;

  if (isError) toast.error((error as CustomError).data.message);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <section>
              <BarChart
                data_1={charts!.products}
                data_2={charts!.users}
                labels={lastSixMonths}
                title_1="Products"
                title_2="Users"
                bgColor_1={`hsl(260, 50%, 30%)`}
                bgColor_2={`hsl(360, 90%, 90%)`}
              />
              <h2>Top Products & Top Customers</h2>
            </section>

            <section>
              <BarChart
                horizontal={true}
                data_1={charts!.orders}
                data_2={[]}
                title_1="Orders"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={lastTwelveMonths}
              />
              <h2>Orders throughout the year</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Barcharts;
