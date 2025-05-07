import { ButtonHTMLAttributes, ReactNode } from "react";

export interface NavMenuProps {
  children: ReactNode;
  isActive: boolean;
  to: string;
}

export interface ProductSortDropdownProps {
  orderBy: string;
  setOrderBy: (value: string) => void;
}

export interface SearchInputProps {
  keyword: string;
  setKeyword: (value: string) => void;
  placeholder?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  children: ReactNode;
}

export interface DropdownProps {
  items: { id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
}

export interface CommentFormProps {
  productId?: string;
  articleId?: string;
  onCommentAdded: () => void;
}

export interface LikeCountBtnProps {
  count: number;
  isLiked: boolean;
  onClick: () => void;
}

export interface MenuOption {
  label: string;
  onClick: () => void;
}

export interface ContextMenuProps {
  options: MenuOption[];
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
