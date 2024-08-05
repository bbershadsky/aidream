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
import {
  QuotesCreate,
  QuotesEditPage,
  QuotesListPage,
  QuotesShowPage,
} from "./pages/quotes";
import { AiGen } from "./pages/aigen";

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
                name: "A.I Generator",
                list: "/aigen",
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
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/aigen" element={<AiGen />} />

                <Route path="/proposals">
                  <Route index element={<QuotesListPage />} />
                  <Route
                    path="create"
                    element={
                      <Authenticated
                        key=""
                        fallback={<NavigateToResource resource="login" />}
                      >
                        <QuotesCreate />
                      </Authenticated>
                    }
                  />
                  <Route path="edit/:id" element={<QuotesEditPage />} />
                  <Route path="show/:id" element={<QuotesShowPage />} />
                </Route>

                <Route path="/companies">
                  <Route index element={<CompanyList />} />
                  <Route
                    path="create"
                    element={
                      <Authenticated
                        key=""
                        fallback={<NavigateToResource resource="login" />}
                      >
                        <CompanyCreate />
                      </Authenticated>
                    }
                  />
                  <Route path="edit/:id" element={<CompanyEdit />} />
                  <Route path="show/:id" element={<CompanyShow />} />
                </Route>

                <Route path="/contacts">
                  <Route index element={<ContactList />} />
                  <Route
                    path="create"
                    element={
                      <Authenticated
                        key=""
                        fallback={<NavigateToResource resource="login" />}
                      >
                        <ContactCreate />
                      </Authenticated>
                    }
                  />
                  <Route path="edit/:id" element={<ContactEdit />} />
                  <Route path="show/:id" element={<ContactShow />} />
                </Route>

                <Route path="*" element={<ErrorComponent />} />
              </Route>

              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage type="register" />} />
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
