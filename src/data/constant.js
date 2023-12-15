import IconMenuUsers from "@assets/icons/menu-users";
import IconMenuChat from "@assets/icons/menu-chat";
import IconDollar from "@assets/icons/dollar-icon";
import IconMenuForms from "@assets/icons/form-icon";
import IconMenuWidgets from "@assets/icons/widget-icon";
import IconMenuNotes from "@assets/icons/notes-icon";
import IconMenuComponents from "@assets/icons/component-icon";

export const sidebarNavItems = [
  {
    title: "Users",
    href: "/",
    icon: <IconMenuUsers className="shrink-0 group-hover:!text-blue-400" />,
  },
  {
    title: "Gifts",
    href: "/gifts",
    icon: <IconMenuWidgets className="shrink-0 group-hover:!text-primary" />,
  },
  {
    title: "Push Notification",
    href: "/notification",
    icon: <IconMenuChat className="shrink-0 group-hover:!text-primary" />,
  },
  {
    title: "Reward Calculation",
    href: "/calculation",
    icon: <IconDollar className="shrink-0 group-hover:!text-primary" />,
  },
  {
    title: "Products",
    href: "/products",
    icon: <IconMenuComponents className="shrink-0 group-hover:!text-primary" />,
    subMenu: [
      {
        title: "New Product",
        href: "/products/create",
      },
      {
        title: "Products List",
        href: "/products",
      },
    ],
  },
  {
    title: "Feedbacks",
    href: "/feedbacks",
    icon: <IconMenuNotes className="shrink-0 group-hover:!text-primary" />,
  },
  {
    title: "Blogs",
    href: "/blogs",
    icon: <IconMenuForms className="shrink-0 group-hover:!text-primary" />,
    subMenu: [
      {
        title: "New Blog",
        href: "/blogs/create",
      },
      {
        title: "Blogs List",
        href: "/blogs",
      },
    ],
  },
  {
    title: "Items",
    href: "/items",
    icon: <IconMenuComponents className="shrink-0 group-hover:!text-primary" />,
    subMenu: [
      {
        title: "New Item",
        href: "/items/create",
      },
      {
        title: "Items List",
        href: "/items",
      },
    ],
  },
];

export const statusOptions = [
  { value: "Created", label: "Created" },
  { value: "Ready", label: "Ready" },
  { value: "Received", label: "Received" },
];

export const productStatusOptions = [
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "Disable",
    value: "Disable",
  },
];

export const productCategoryOptions = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Toys",
    value: "Toys",
  },
  {
    label: "Beauty & Fashion",
    value: "Beauty & Fashion",
  },
  {
    label: "Electronics & Electrical",
    value: "Electronics & Electrical",
  },
];

export const productSubCategoryOptions = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Toys",
    value: "Toys",
  },
  {
    label: "Beauty & Fashion",
    value: "Beauty & Fashion",
  },
  {
    label: "Electronics & Electrical",
    value: "Electronics & Electrical",
  },
];

export const blogCategory = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Toys",
    value: "Toys",
  },
  {
    label: "Beauty & Fashion",
    value: "Beauty & Fashion",
  },
  {
    label: "Electronics & Electrical",
    value: "Electronics & Electrical",
  },
];

export const blogSubCategory = [
  {
    label: "Toys",
    value: "Toys",
  },
  {
    label: "Beauty & Fashion",
    value: "Beauty & Fashion",
  },
  {
    label: "Electronics & Electrical",
    value: "Electronics & Electrical",
  },
];

export const marketPlaceOptions = [
  {
    label: "Yandex Market",
    value: "Yandex Market",
  },
  {
    label: "Ozon",
    value: "Ozon",
  },
];

export const ACCEPTED_FILE_TYPES =
  "image/*,application/pdf,application/zip,application/vnd.rar,application/epub+zip,.psd";
