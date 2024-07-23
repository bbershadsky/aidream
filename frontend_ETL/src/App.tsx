// import { Refine } from "@refinedev/core";
// import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
// import { ThemedLayoutV2, useNotificationProvider } from "@refinedev/antd";
// import dataProvider, {
//   GraphQLClient,
//   liveProvider,
// } from "@refinedev/nestjs-query";
// import { createClient } from "graphql-ws";
// import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import routerBindings, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import {
  DashboardOutlined,
  ShopOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { ColorModeContextProvider } from "./contexts/color-mode";
import { Dashboard } from "./pages/dashboard";
import {
  CompanyList,
  CompanyCreate,
  CompanyEdit,
  CompanyShow,
} from "./pages/companies";
import {
  ContactList,
  ContactCreate,
  ContactEdit,
  ContactShow,
} from "./pages/contacts";

import "@refinedev/antd/dist/reset.css";

// const API_URL = "https://gersu.com/v1/graphql";
// const WS_URL = "wss:/gersu.com/v1/graphql";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiamltLmhhbHBlcnRAZHVuZGVybWlmZmxpbi5jb20iLCJpYXQiOjE2OTQ2ODI0OTksImV4cCI6MTg1MjQ3MDQ5OX0.4PF7-VYY4tlpuvGHmsunaH_ETLd-N_ANSjEB_NiPExw";

// const gqlClient = new GraphQLClient(API_URL, {
//   headers: {
//     Authorization: `Bearer ${ACCESS_TOKEN}`,
//   },
// });

// const wsClient = createClient({
//   url: WS_URL,
//   connectionParams: () => ({
//     headers: {
//       Authorization: `Bearer ${ACCESS_TOKEN}`,
//     },
//   }),
// });

import { Authenticated, Refine } from "@refinedev/core";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import {
  AuthPage,
  ErrorComponent,
  RefineThemes,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import "@refinedev/antd/dist/reset.css";

import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { appwriteClient } from "./utility";
import { authProvider } from "./auth-provider";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(appwriteClient, {
              databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
            })}
            liveProvider={liveProvider(appwriteClient, {
              databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
            })}
            // dataProvider={dataProvider(gqlClient)}
            //             liveProvider={liveProvider(wsClient)}
            //             notificationProvider={useNotificationProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "dashboard",
                list: "/",
                meta: {
                  icon: (
                    <DashboardOutlined
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  ),
                },
              },
              {
                name: "669e459d001d91a860c3",
                list: "/proposals",
                create: "/proposals/create",
                edit: "/proposals/edit/:id",
                show: "/proposals/show/:id",
                meta: {
                  canDelete: true,
                  label: "Proposals",
                  icon: (
                    <ShopOutlined
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  ),
                },
              },
              {
                name: "66a031420005f3d71bd7",
                list: "/companies",
                create: "/companies/create",
                edit: "/companies/edit/:id",
                show: "/companies/show/:id",
                meta: {
                  canDelete: true,
                  label: "Companies",
                  icon: (
                    <ShopOutlined
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  ),
                },
              },
              {
                name: "66a0301600057f98bdc8",
                list: "/contacts",
                create: "/contacts/create",
                edit: "/contacts/edit/:id",
                show: "/contacts/show/:id",
                meta: {
                  // canDelete: true,
                  label: "Contacts",
                  icon: (
                    <TeamOutlined
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  ),
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              liveMode: "auto",
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="/" element={<Dashboard />} />

                <Route path="/proposals">
                  <Route index element={<CompanyList />} />
                  <Route path="create" element={<CompanyCreate />} />
                  <Route path="edit/:id" element={<CompanyEdit />} />
                  <Route path="show/:id" element={<CompanyShow />} />
                </Route>

                <Route path="/companies">
                  <Route index element={<CompanyList />} />
                  <Route path="create" element={<CompanyCreate />} />
                  <Route path="edit/:id" element={<CompanyEdit />} />
                  <Route path="show/:id" element={<CompanyShow />} />
                </Route>

                <Route path="/contacts">
                  <Route index element={<ContactList />} />
                  <Route path="create" element={<ContactCreate />} />
                  <Route path="edit/:id" element={<ContactEdit />} />
                  <Route path="show/:id" element={<ContactShow />} />
                </Route>
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="61c43ad33b857" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<AuthPage />} />
                <Route
                  path="/register"
                  element={<AuthPage type="register" />}
                />
              </Route>

              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;

// function App() {
//   return (
//     <BrowserRouter>
//       <RefineKbarProvider>
//         <ColorModeContextProvider>
//           <Refine
//             dataProvider={dataProvider(gqlClient)}
//             liveProvider={liveProvider(wsClient)}
//             notificationProvider={useNotificationProvider}
//             routerProvider={routerBindings}
//             resources={[
//               {
//                 name: "dashboard",
//                 list: "/",
//                 meta: {
//                   // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
//                   icon: <DashboardOutlined />,
//                 },
//               },
//               {
//                 name: "proposales",
//                 list: "/proposals",
//                 create: "/proposals/create",
//                 edit: "/proposals/edit/:id",
//                 show: "/proposals/show/:id",
//                 meta: {
//                   canDelete: true,
//                   // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
//                   icon: <ShopOutlined />,
//                 },
//               },
//               {
//                 name: "companies",
//                 list: "/companies",
//                 create: "/companies/create",
//                 edit: "/companies/edit/:id",
//                 show: "/companies/show/:id",
//                 meta: {
//                   canDelete: true,
//                   // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
//                   icon: <ShopOutlined />,
//                 },
//               },
//               {
//                 name: "contacts",
//                 list: "/contacts",
//                 create: "/contacts/create",
//                 edit: "/contacts/edit/:id",
//                 show: "/contacts/show/:id",
//                 meta: {
//                   canDelete: true,
//                   // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
//                   icon: <TeamOutlined />,
//                 },
//               },
//             ]}
//             options={{
//               syncWithLocation: true,
//               warnWhenUnsavedChanges: true,
//               liveMode: "auto",
//             }}
//           >
//             <Routes>
//               <Route
//                 element={
//                   <ThemedLayoutV2>
//                     <Outlet />
//                   </ThemedLayoutV2>
//                 }
//               >
//                 <Route path="/">
//                   <Route index element={<Dashboard />} />
//                 </Route>

//                 <Route path="/proposals">
//                   <Route index element={<CompanyList />} />
//                   <Route path="create" element={<CompanyCreate />} />
//                   <Route path="edit/:id" element={<CompanyEdit />} />
//                   <Route path="show/:id" element={<CompanyShow />} />
//                 </Route>
//                 <Route path="/companies">
//                   <Route index element={<CompanyList />} />
//                   <Route path="create" element={<CompanyCreate />} />
//                   <Route path="edit/:id" element={<CompanyEdit />} />
//                   <Route path="show/:id" element={<CompanyShow />} />
//                 </Route>

//                 <Route path="/contacts">
//                   <Route index element={<ContactList />} />
//                   <Route path="create" element={<ContactCreate />} />
//                   <Route path="edit/:id" element={<ContactEdit />} />
//                   <Route path="show/:id" element={<ContactShow />} />
//                 </Route>
//               </Route>
//             </Routes>
//             <RefineKbar />
//             <UnsavedChangesNotifier />
//             <DocumentTitleHandler />
//           </Refine>
//         </ColorModeContextProvider>
//       </RefineKbarProvider>
//     </BrowserRouter>
//   );
// }
