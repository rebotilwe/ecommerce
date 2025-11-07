// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// const DashboardGraph = ({ totals }) => {
//   const chartData = [
//     { name: "Users", value: totals.users },
//     { name: "Orders", value: totals.orders },
//     { name: "Messages", value: totals.messages },
//   ];

//   return (
//     <div style={{ width: "100%", height: 300 }}>
//       <ResponsiveContainer>
//         <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="value" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default DashboardGraph;
