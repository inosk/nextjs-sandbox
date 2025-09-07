import * as React from "react";

export type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  /**
   * 交互に背景色を付けるストライプ表示（行グループ単位）。
   * `TableRowGroup` を用いる場合はこちらで制御します。
   */
  striped?: boolean | "even" | "odd";
};
export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;
export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  /**
   * 交互に背景色を付けるストライプ表示。
   * true の場合は even 行に色を付与。"odd" を指定すると奇数行に付与。
   */
  striped?: boolean | "even" | "odd";
};
export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;
export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  /**
   * Cell/Head 以外の要素（任意の ReactNode）を行の前後どちらに配置するか。
   * デフォルトは下側（bottom）。
   */
  nonCellPosition?: "top" | "bottom";
};
export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;
export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;
export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

export const TableContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`w-full overflow-x-auto rounded-card border border-foreground/10 bg-background shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);
TableContainer.displayName = "TableContainer";

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className = "", striped = false, ...props }, ref) => {
    const variant = typeof striped === "string" ? striped : striped ? "even" : undefined;
    // tbody（行グループ）単位でのストライプ。thead/tfoot の存在に左右されないよう nth-of-type を使用。
    const stripeClass =
      variant === "odd"
        ? "[&>tbody:nth-of-type(odd)>tr]:bg-foreground/5"
        : variant === "even"
        ? "[&>tbody:nth-of-type(even)>tr]:bg-foreground/5"
        : "";
    return (
      <table
        ref={ref}
        className={`w-full border-collapse text-body text-foreground ${stripeClass} ${className}`}
        {...props}
      />
    );
  }
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className = "", ...props }, ref) => (
    <thead
      ref={ref}
      className={`bg-foreground/5 text-foreground/80 ${className}`}
      {...props}
    />
  )
);
TableHeader.displayName = "TableHeader";
// 行グループ（1 論理行 = 複数 <tr> を包含）を表す tbody。
// `Table` の striped を使用することでグループ単位のストライプが有効になります。
export const TableRowGroup = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = "", ...props }, ref) => (
  // グループホバーで配下のすべての tr に背景色を適用
  <tbody ref={ref} className={`hover:[&>tr]:bg-foreground/5 ${className}`} {...props} />
 ));
TableRowGroup.displayName = "TableRowGroup";

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = "", striped = false, ...props }, ref) => {
    const variant = typeof striped === "string" ? striped : striped ? "even" : undefined;
    const stripeClass = variant === "odd"
      ? "[&>tr:nth-child(odd)]:bg-foreground/5"
      : variant === "even"
      ? "[&>tr:nth-child(even)]:bg-foreground/5"
      : "";
    return <tbody ref={ref} className={`${stripeClass} ${className}`} {...props} />;
  }
);
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className = "", ...props }, ref) => (
    <tfoot ref={ref} className={`bg-foreground/5 ${className}`} {...props} />
  )
);
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className = "", children, nonCellPosition = "bottom", ...props }, ref) => {
    // 子要素を Cell/Head とそれ以外に分類し、
    // それ以外は 1 行（colSpan）で上/下に配置する。
    const childArray = React.Children.toArray(children) as React.ReactNode[];
    const isCell = (el: React.ReactNode) => {
      if (!React.isValidElement(el)) return false;
      return el.type === TableCell || el.type === TableHead;
    };
    const cells = childArray.filter(isCell);
    const others = childArray.filter((c) => !isCell(c));

    const colSpan = Math.max(1, cells.length);

    const hasExtras = others.length > 0;
    const mainBorderClass = !hasExtras
      ? "border-b border-foreground/10"
      : nonCellPosition === "bottom"
      ? "" // 下に extra があるので、間の罫線は非表示
      : "border-b border-foreground/10"; // 上に extra、外枠は main が担当

    const extraBorderClass = hasExtras
      ? nonCellPosition === "bottom"
        ? "border-b border-foreground/10" // 外枠は extra が担当
        : "" // 上側 extra と main の間は罫線非表示
      : "";

    const mainRow = (
      <tr
        ref={ref}
        className={`${mainBorderClass} hover:bg-foreground/5 ${className}`}
        data-row-part="main"
        {...props}
      >
        {cells}
      </tr>
    );

    const extraRow = hasExtras ? (
      <tr className={extraBorderClass} data-row-part="extra">
        <td colSpan={colSpan} className="p-0 align-top">
          {/* フル幅でカラムスタイルの影響を受けないコンテナ */}
          <div className="w-full">{others}</div>
        </td>
      </tr>
    ) : null;

    if (!extraRow) return mainRow;

    return (
      <>
        {nonCellPosition === "top" ? extraRow : null}
        {mainRow}
        {nonCellPosition === "bottom" ? extraRow : null}
      </>
    );
  }
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className = "", ...props }, ref) => (
    <th
      ref={ref}
      className={`px-4 py-2 text-left text-caption font-semibold tracking-wide text-foreground/70 ${className}`}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className = "", ...props }, ref) => (
    <td ref={ref} className={`px-4 py-2 align-middle ${className}`} {...props} />
  )
);
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className = "", ...props }, ref) => (
    <caption
      ref={ref}
      className={`caption-bottom px-4 py-2 text-caption text-foreground/60 ${className}`}
      {...props}
    />
  )
);
TableCaption.displayName = "TableCaption";

export default Table;
