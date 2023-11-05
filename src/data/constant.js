import PhoneIcon from "@assets/icons/phone";
import UserIcon from "@assets/icons/user-icon";
export const sidebarNavItems = [
  {
    title: "Users",
    href: "/",
    icon: <UserIcon color="#ffffff" height={24} width={24} />,
  },
  {
    title: "Gifts",
    href: "/gifts",
    icon: <PhoneIcon height={24} width={24} />,
  },
  {
    title: "Push Notification",
    href: "/notification",
    icon: <PhoneIcon height={24} width={24} />,
  },
  {
    title: "Reward Calculation",
    href: "/calculation",
    icon: <PhoneIcon height={24} width={24} />,
  },
  {
    title: "Products",
    href: "/products",
    icon: <PhoneIcon height={24} width={24} />,
  },
  {
    title: "Feedbacks",
    href: "/feedbacks",
    icon: <PhoneIcon height={24} width={24} />,
  },
  {
    title: "Blogs",
    href: "/blogs",
    icon: <PhoneIcon height={24} width={24} />,
  },
  {
    title: "Items",
    href: "/items",
    icon: <PhoneIcon height={24} width={24} />,
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
