'use client';

import { useState } from 'react';
import styles from './page.module.css';

type Order = {
  id: string;
  productId: string;
  amount: number;
  currency: string;
  status: string;
  refundedAmount: number;
  createdAt: string;
  providerPaymentIntentId: string | null;
  license: {
    id: string;
    status: string;
    revokedAt: string | null;
  } | null;
};

export default function InternalAdminPage() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);

    const res = await fetch('/api/internal-admin/license/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    await search();
  }

  async function revoke(id: string) {
    await fetch('/api/internal-admin/license/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseId: id }),
    });

    await search();
  }

  async function reactivate(id: string) {
    await fetch('/api/internal-admin/license/reactivate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseId: id }),
    });

    await search();
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Internal Admin</h1>

        <form className={styles.form} onSubmit={handleSearch}>
          <input
            type="email"
            placeholder="Customer email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {orders.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Purchased</th>
                  <th>Amount</th>
                  <th>Refunded</th>
                  <th>Revoked at</th>
                  <th>License</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.productId}</td>

                    <td
                      className={
                        order.status === 'PAID' ? styles.statusPaid : styles.statusRefunded
                      }
                    >
                      {order.status}
                    </td>

                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                    <td>
                      {(order.amount / 100).toFixed(2)} {order.currency}
                    </td>

                    <td>{(order.refundedAmount / 100).toFixed(2)}</td>

                    <td>
                      {order.license?.revokedAt
                        ? new Date(order.license.revokedAt).toLocaleDateString()
                        : '—'}
                    </td>

                    <td>
                      {order.license ? (
                        <span
                          className={
                            order.license.status === 'ACTIVE'
                              ? styles.licenseActive
                              : styles.licenseRevoked
                          }
                        >
                          {order.license.status}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>

                    <td>
                      {order.license?.status === 'ACTIVE' && (
                        <button
                          className={styles.revokeBtn}
                          onClick={() => revoke(order.license!.id)}
                        >
                          Revoke
                        </button>
                      )}

                      {order.license?.status === 'REVOKED' && (
                        <button
                          className={styles.reactivateBtn}
                          onClick={() => reactivate(order.license!.id)}
                        >
                          Reactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
