import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { LogIn, Package, ShoppingBag, Trash2, Edit2, Plus, X, Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface Product {
  id: number;
  name_fr: string;
  name_en: string;
  description_fr: string;
  description_en: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
}

interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total_price: number;
  status: string;
  created_at: string;
}

const API = '/api';

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(197,160,89,0.85)',
  marginBottom: '0.4rem',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(197,160,89,0.3)',
  color: '#F5F5F5',
  padding: '0.65rem 0.9rem',
  fontSize: '0.875rem',
  fontFamily: 'Roboto, sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
};

const btnGold: React.CSSProperties = {
  background: '#C5A059',
  color: '#1A1A1A',
  border: 'none',
  padding: '0.65rem 1.5rem',
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: '1rem',
  letterSpacing: '0.12em',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const btnOutline: React.CSSProperties = {
  background: 'transparent',
  color: '#C5A059',
  border: '1px solid rgba(197,160,89,0.5)',
  padding: '0.5rem 1rem',
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: '0.9rem',
  letterSpacing: '0.1em',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
};

const emptyProduct = (): Omit<Product, 'id'> => ({
  name_fr: '',
  name_en: '',
  description_fr: '',
  description_en: '',
  price: 0,
  stock: 0,
  image_url: '',
  category: 'b2c',
});

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('phanor_admin_token'));
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct());
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const authHeaders = () => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

  const logout = () => {
    localStorage.removeItem('phanor_admin_token');
    setToken(null);
  };

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/auth/verify`, { headers: authHeaders() })
      .then(r => { if (!r.ok) logout(); })
      .catch(() => logout());
  }, [token]);

  useEffect(() => {
    if (!token) return;
    if (tab === 'products') loadProducts();
    if (tab === 'orders') loadOrders();
  }, [tab, token]);

  async function loadProducts() {
    setLoading(true);
    try {
      const r = await fetch(`${API}/products`);
      setProducts(await r.json());
    } catch { showToast('Error loading products', false); }
    finally { setLoading(false); }
  }

  async function loadOrders() {
    setLoading(true);
    try {
      const r = await fetch(`${API}/orders`, { headers: authHeaders() });
      setOrders(await r.json());
    } catch { showToast('Error loading orders', false); }
    finally { setLoading(false); }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const r = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await r.json();
      if (!r.ok) { setLoginError(data.error || 'Invalid credentials'); return; }
      localStorage.setItem('phanor_admin_token', data.token);
      setToken(data.token);
    } catch {
      setLoginError('Connection error. Is the server running?');
    } finally { setLoginLoading(false); }
  }

  async function uploadImage(file: File): Promise<string> {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !preset) {
      throw new Error('Cloudinary not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.');
    }
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', preset);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setUploadProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data.secure_url);
        } else {
          reject(new Error('Upload failed'));
        }
      };
      xhr.onerror = () => reject(new Error('Upload error'));
      xhr.send(fd);
    });
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    try {
      const url = await uploadImage(file);
      setForm(f => ({ ...f, image_url: url }));
      showToast('Image uploaded');
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Upload failed', false);
    } finally { setUploading(false); setUploadProgress(0); }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const url = editProduct ? `${API}/products/${editProduct.id}` : `${API}/products`;
      const method = editProduct ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(form) });
      if (!r.ok) throw new Error('Save failed');
      showToast(editProduct ? 'Product updated' : 'Product created');
      setShowForm(false);
      setEditProduct(null);
      setForm(emptyProduct());
      loadProducts();
    } catch { showToast('Save failed', false); }
  }

  async function deleteProduct(id: number) {
    if (!confirm('Delete this product?')) return;
    try {
      await fetch(`${API}/products/${id}`, { method: 'DELETE', headers: authHeaders() });
      showToast('Product deleted');
      loadProducts();
    } catch { showToast('Delete failed', false); }
  }

  async function updateOrderStatus(id: number, status: string) {
    try {
      await fetch(`${API}/orders/${id}/status`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      showToast('Status updated');
      loadOrders();
    } catch { showToast('Update failed', false); }
  }

  function openEdit(p: Product) {
    setEditProduct(p);
    setForm({
      name_fr: p.name_fr, name_en: p.name_en,
      description_fr: p.description_fr, description_en: p.description_en,
      price: p.price, stock: p.stock, image_url: p.image_url, category: p.category,
    });
    setShowForm(true);
  }

  function openNew() {
    setEditProduct(null);
    setForm(emptyProduct());
    setShowForm(true);
  }

  const statusColor = (s: string) =>
    s === 'paid' ? '#4ade80' : s === 'cancelled' ? '#f87171' : '#C5A059';

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <img src="/logo.png" alt="Phanor" style={{ height: '56px', marginBottom: '1.5rem' }} />
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', letterSpacing: '0.12em', color: '#F5F5F5' }}>
              PANNEAU <span style={{ color: '#C5A059' }}>ADMIN</span>
            </h1>
            <p style={{ color: 'rgba(245,245,245,0.45)', fontSize: '0.8rem', letterSpacing: '0.15em', marginTop: '0.5rem' }}>
              ACCÈS RESTREINT
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Courriel</label>
              <input style={inputStyle} type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Mot de passe</label>
              <input style={inputStyle} type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
            </div>
            {loginError && (
              <div style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)', padding: '0.75rem', marginBottom: '1rem', color: '#f87171', fontSize: '0.85rem' }}>
                {loginError}
              </div>
            )}
            <button style={{ ...btnGold, width: '100%', justifyContent: 'center' }} type="submit" disabled={loginLoading}>
              <LogIn size={16} />
              {loginLoading ? 'CONNEXION...' : 'SE CONNECTER'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#111', color: '#F5F5F5' }}>
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          background: toast.ok ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
          border: `1px solid ${toast.ok ? 'rgba(74,222,128,0.4)' : 'rgba(248,113,113,0.4)'}`,
          color: toast.ok ? '#4ade80' : '#f87171',
          padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem',
        }}>
          {toast.ok ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      <header style={{ background: '#1A1A1A', borderBottom: '1px solid rgba(197,160,89,0.2)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo.png" alt="Phanor" style={{ height: '36px' }} />
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.2rem', letterSpacing: '0.12em', color: '#C5A059' }}>
            ADMIN
          </span>
        </div>
        <button onClick={logout} style={{ ...btnOutline, fontSize: '0.8rem' }}>Déconnexion</button>
      </header>

      <div style={{ display: 'flex', borderBottom: '1px solid rgba(197,160,89,0.15)', background: '#1A1A1A' }}>
        {(['products', 'orders'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '0.9rem 2rem',
              background: 'transparent',
              border: 'none',
              borderBottom: tab === t ? '2px solid #C5A059' : '2px solid transparent',
              color: tab === t ? '#C5A059' : 'rgba(245,245,245,0.45)',
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '0.95rem',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}
          >
            {t === 'products' ? <Package size={15} /> : <ShoppingBag size={15} />}
            {t === 'products' ? 'PRODUITS' : 'COMMANDES'}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {tab === 'products' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', letterSpacing: '0.08em' }}>
                GESTION DES <span style={{ color: '#C5A059' }}>PRODUITS</span>
              </h2>
              <button style={btnGold} onClick={openNew}>
                <Plus size={15} /> NOUVEAU PRODUIT
              </button>
            </div>

            {loading ? (
              <p style={{ color: 'rgba(245,245,245,0.4)', textAlign: 'center', padding: '3rem' }}>Chargement...</p>
            ) : (
              <div style={{ display: 'grid', gap: '1px', background: 'rgba(197,160,89,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 100px 80px 100px 120px', gap: '1rem', padding: '0.75rem 1rem', background: '#1A1A1A', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(197,160,89,0.7)', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  <span>Image</span><span>FR</span><span>EN</span><span>Prix</span><span>Stock</span><span>Catégorie</span><span>Actions</span>
                </div>
                {products.length === 0 && (
                  <div style={{ padding: '3rem', textAlign: 'center', background: '#1A1A1A', color: 'rgba(245,245,245,0.3)' }}>
                    Aucun produit. Cliquez sur "Nouveau Produit" pour commencer.
                  </div>
                )}
                {products.map(p => (
                  <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 100px 80px 100px 120px', gap: '1rem', padding: '0.85rem 1rem', background: '#1A1A1A', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                      {p.image_url && <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem' }}>{p.name_fr}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(245,245,245,0.4)' }}>{p.description_fr?.slice(0, 50)}{p.description_fr?.length > 50 ? '…' : ''}</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem' }}>{p.name_en}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(245,245,245,0.4)' }}>{p.description_en?.slice(0, 50)}{p.description_en?.length > 50 ? '…' : ''}</div>
                    </div>
                    <div style={{ color: '#C5A059', fontFamily: 'Bebas Neue', fontSize: '1.1rem' }}>${Number(p.price).toFixed(2)}</div>
                    <div style={{ color: p.stock < 5 ? '#f87171' : 'rgba(245,245,245,0.7)', fontSize: '0.875rem' }}>{p.stock}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(245,245,245,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.category}</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openEdit(p)} style={{ ...btnOutline, padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}><Edit2 size={12} /></button>
                      <button onClick={() => deleteProduct(p.id)} style={{ ...btnOutline, padding: '0.4rem 0.75rem', fontSize: '0.75rem', borderColor: 'rgba(248,113,113,0.4)', color: '#f87171' }}><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'orders' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', letterSpacing: '0.08em' }}>
                GESTION DES <span style={{ color: '#C5A059' }}>COMMANDES</span>
              </h2>
              <button style={btnOutline} onClick={loadOrders}>Actualiser</button>
            </div>
            {loading ? (
              <p style={{ color: 'rgba(245,245,245,0.4)', textAlign: 'center', padding: '3rem' }}>Chargement...</p>
            ) : (
              <div style={{ display: 'grid', gap: '1px', background: 'rgba(197,160,89,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 100px 120px 160px', gap: '1rem', padding: '0.75rem 1rem', background: '#1A1A1A', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(197,160,89,0.7)', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  <span>#</span><span>Client</span><span>Date</span><span>Total</span><span>Statut</span><span>Actions</span>
                </div>
                {orders.length === 0 && (
                  <div style={{ padding: '3rem', textAlign: 'center', background: '#1A1A1A', color: 'rgba(245,245,245,0.3)' }}>
                    Aucune commande pour l'instant.
                  </div>
                )}
                {orders.map(o => (
                  <div key={o.id} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 100px 120px 160px', gap: '1rem', padding: '0.85rem 1rem', background: '#1A1A1A', alignItems: 'center' }}>
                    <div style={{ color: '#C5A059', fontFamily: 'Bebas Neue', fontSize: '1rem' }}>#{o.id}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{o.customer_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(245,245,245,0.4)' }}>{o.customer_email}</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(245,245,245,0.5)' }}>
                      {new Date(o.created_at).toLocaleDateString('fr-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                    <div style={{ color: '#C5A059', fontFamily: 'Bebas Neue', fontSize: '1.1rem' }}>${Number(o.total_price).toFixed(2)}</div>
                    <div style={{ color: statusColor(o.status), fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{o.status}</div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {o.status !== 'paid' && (
                        <button onClick={() => updateOrderStatus(o.id, 'paid')} style={{ ...btnOutline, padding: '0.3rem 0.6rem', fontSize: '0.7rem', borderColor: 'rgba(74,222,128,0.4)', color: '#4ade80' }}>Payé</button>
                      )}
                      {o.status !== 'cancelled' && (
                        <button onClick={() => updateOrderStatus(o.id, 'cancelled')} style={{ ...btnOutline, padding: '0.3rem 0.6rem', fontSize: '0.7rem', borderColor: 'rgba(248,113,113,0.4)', color: '#f87171' }}>Annuler</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#1A1A1A', border: '1px solid rgba(197,160,89,0.25)', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(197,160,89,0.15)' }}>
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.2rem', letterSpacing: '0.1em', color: '#C5A059' }}>
                {editProduct ? 'MODIFIER LE PRODUIT' : 'NOUVEAU PRODUIT'}
              </h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: 'rgba(245,245,245,0.5)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'grid', gap: '1.1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Nom (FR)</label>
                  <input style={inputStyle} value={form.name_fr} onChange={e => setForm(f => ({ ...f, name_fr: e.target.value }))} required />
                </div>
                <div>
                  <label style={labelStyle}>Name (EN)</label>
                  <input style={inputStyle} value={form.name_en} onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Description (FR)</label>
                  <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.description_fr} onChange={e => setForm(f => ({ ...f, description_fr: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>Description (EN)</label>
                  <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.description_en} onChange={e => setForm(f => ({ ...f, description_en: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Prix ($)</label>
                  <input style={inputStyle} type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))} required />
                </div>
                <div>
                  <label style={labelStyle}>Stock</label>
                  <input style={inputStyle} type="number" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: parseInt(e.target.value) || 0 }))} />
                </div>
                <div>
                  <label style={labelStyle}>Catégorie</label>
                  <select style={{ ...inputStyle }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    <option value="b2c">B2C (Sélect)</option>
                    <option value="b2b">B2B (Grossiste)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Image</label>
                {form.image_url && (
                  <div style={{ marginBottom: '0.75rem', width: '120px', height: '90px', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                    <img src={form.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                  <button type="button" onClick={() => fileRef.current?.click()} style={btnOutline} disabled={uploading}>
                    <Upload size={14} />
                    {uploading ? `UPLOAD ${uploadProgress}%` : 'CHOISIR IMAGE'}
                  </button>
                  {uploading && (
                    <div style={{ flex: 1, height: '4px', background: 'rgba(197,160,89,0.15)', borderRadius: '2px' }}>
                      <div style={{ height: '100%', background: '#C5A059', width: `${uploadProgress}%`, transition: 'width 0.2s', borderRadius: '2px' }} />
                    </div>
                  )}
                </div>
                <input
                  style={{ ...inputStyle, marginTop: '0.5rem' }}
                  placeholder="ou coller une URL directement"
                  value={form.image_url}
                  onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowForm(false)} style={btnOutline}>Annuler</button>
                <button type="submit" style={btnGold}>
                  <CheckCircle size={15} />
                  {editProduct ? 'METTRE À JOUR' : 'CRÉER PRODUIT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
