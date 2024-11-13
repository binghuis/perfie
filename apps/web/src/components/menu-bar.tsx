import { Path } from '@/router';
import { Menu, MenuProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import type { ItemType } from 'antd/es/menu/interface';

interface BaseMenuBarItem {
  icon?: React.ReactNode;
  label: React.ReactNode;
}

interface LeafMenuBarItem extends BaseMenuBarItem {
  key?: string;
  path: Path;
  related?: Path[];
}

interface InternalMenuBarItem extends BaseMenuBarItem {
  key?: string;
  children: MenuBarItem[];
}

export type MenuBarItem = LeafMenuBarItem | InternalMenuBarItem;

type FormatedItem = (LeafMenuBarItem & { key: string }) | (InternalMenuBarItem & { key: string; children: FormatedItem[] });

export interface MenuBarProps extends Omit<MenuProps, 'items'> {
  items: MenuBarItem[];
}

const INDEX = '/';

const MenuBar = (props: MenuBarProps) => {
  const { items, mode = 'inline', ...restProps } = props;
  const [selectedKey, setSelectedKey] = useState<string>(INDEX);
  const [openKeys, setOpenKeys] = useState<string[]>();
  const { pathname } = useLocation();

  const formatedItems: FormatedItem[] = useMemo(() => formatItems(items), [items]);
  const menuItems = useMemo(() => convertItem2MenuItem(formatedItems), formatedItems);

  const renderMenu = (item: FormatedItem, parentItems: FormatedItem[]) => {
    const items = [...parentItems, item];
    let isMatch = false;

    if ('path' in item && item.path) {
      const paths = item.related ? [item.path, ...item.related] : [item.path];
      isMatch = paths.some((path) => matchPath(path, pathname));
    }

    if (isMatch) {
      const lastItem = items[items.length - 1] as LeafMenuBarItem;
      if (lastItem.path) {
        setSelectedKey(lastItem.path);
      }
      if (items.length > 1) {
        setOpenKeys(items.slice(0, -1).map((item) => item.key));
      }
    }

    if ('children' in item && item.children) {
      item.children.forEach((child) => renderMenu(child as FormatedItem, items));
    }
  };

  useEffect(() => {
    formatedItems.forEach((item) => renderMenu(item, []));
  }, [pathname]);

  return <Menu {...restProps} mode={mode} selectedKeys={[selectedKey]} openKeys={openKeys} onOpenChange={setOpenKeys} items={menuItems} />;
};

/** 将 Item[] 转换成 MenuItem[] */
function convertItem2MenuItem(items: FormatedItem[]): ItemType[] {
  return items.map(({ label, icon, key, ...item }) => {
    const menuItem = {
      label: 'path' in item && item.path ? <Link to={item.path}>{label}</Link> : label,
      icon,
      key,
    };

    if ('children' in item && item.children) {
      return { ...menuItem, children: convertItem2MenuItem(item.children) };
    }
    return menuItem;
  });
}

const formatItems = (items: MenuBarItem[]): FormatedItem[] => {
  return items.map((item) => {
    const formattedItem: FormatedItem = {
      ...item,
      key: 'path' in item && item.path ? item.path : (item.key ?? nanoid()),
    } as FormatedItem;
    if ('children' in item && item.children) {
      (formattedItem as InternalMenuBarItem).children = formatItems(item.children);
    }
    return formattedItem;
  });
};

export default MenuBar;
