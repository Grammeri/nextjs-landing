'use client';

import { ReactNode, useMemo, useState } from 'react';
import styles from './ProductTabs.module.css';

type Tab = { id: string; label: string; content: ReactNode };

type ProductTabsProps = {
  tabs: Tab[];
  defaultTabId?: string;
};

export function ProductTabs({ tabs, defaultTabId }: ProductTabsProps) {
  const fallbackTabId = useMemo(() => tabs[0]?.id ?? '', [tabs]);
  const initialTabId = defaultTabId ?? fallbackTabId;
  const [activeTabId, setActiveTabId] = useState(initialTabId);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  if (!activeTab) {
    return null;
  }

  const tabPanelId = `product-tabpanel-${activeTab.id}`;

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist" aria-label="Product features">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab.id;
          const tabId = `product-tab-${tab.id}`;

          return (
            <button
              key={tab.id}
              id={tabId}
              type="button"
              role="tab"
              className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ''}`}
              aria-selected={isActive}
              aria-controls={tabPanelId}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        id={tabPanelId}
        role="tabpanel"
        aria-labelledby={`product-tab-${activeTab.id}`}
        className={styles.panel}
      >
        {activeTab.content}
      </div>
    </div>
  );
}
