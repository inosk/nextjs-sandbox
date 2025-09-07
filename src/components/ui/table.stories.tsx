import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableRowGroup,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
  TableFooter,
} from "./table";

const meta: Meta = {
  title: "UI/Table",
  component: Table,
  subcomponents: {
    TableContainer,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableCaption,
    TableFooter,
  },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "トークンに沿ったスタイルのテーブルコンポーネント。`TableBody` の `striped` プロップで行のストライプ表示（偶数/奇数）を切り替えできます。",
      },
    },
  },
  argTypes: {
    // expose striped control via subcomponent stories examples
    // (DocsのPropsテーブルにはsubcomponentsとして表示されます)
    // Keep empty here; individual stories demonstrate usage.
  },
};

export default meta;
type Story = StoryObj;

const rows = [
  { name: "Alice", email: "alice@example.com", role: "Admin" },
  { name: "Bob", email: "bob@example.com", role: "Editor" },
  { name: "Carol", email: "carol@example.com", role: "Viewer" },
  { name: "Dave", email: "dave@example.com", role: "Viewer" },
];

export const Basic: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <TableCaption>Basic table without stripes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.email}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.email}</TableCell>
              <TableCell>{r.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total: {rows.length} users</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ),
};

export const StripedEven: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <TableCaption>Striped (even rows)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody striped>
          {rows.map((r) => (
            <TableRow key={r.email}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.email}</TableCell>
              <TableCell>{r.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

export const StripedOdd: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <TableCaption>Striped (odd rows)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody striped="odd">
          {rows.map((r) => (
            <TableRow key={r.email}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.email}</TableCell>
              <TableCell>{r.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

export const WithExtrasBottom: Story = {
  render: () => (
    <TableContainer>
      <Table striped>
        <TableCaption>Row with extra content (bottom, grouped stripe)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        {/* 行グループ単位で stripe させるため TableRowGroup を使用 */}
        {rows.map((r) => (
          <TableRowGroup key={r.email}>
            <TableRow>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.email}</TableCell>
              <TableCell>{r.role}</TableCell>
              {/* Cell/Head 以外の要素は自動的に full-width で下側に配置される */}
              <div className="px-4 py-3 text-foreground/70">
                Extra row content for {r.name}
              </div>
            </TableRow>
          </TableRowGroup>
        ))}
      </Table>
    </TableContainer>
  ),
};

export const WithExtrasTop: Story = {
  render: () => (
    <TableContainer>
      <Table striped="odd">
        <TableCaption>Row with extra content (top, grouped stripe)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        {rows.map((r) => (
          <TableRowGroup key={r.email}>
            <TableRow nonCellPosition="top">
              {/* 上側に full-width で表示 */}
              <div className="px-4 py-3 text-foreground/70">
                Sticky note for {r.name}
              </div>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.email}</TableCell>
              <TableCell>{r.role}</TableCell>
            </TableRow>
          </TableRowGroup>
        ))}
      </Table>
    </TableContainer>
  ),
};
