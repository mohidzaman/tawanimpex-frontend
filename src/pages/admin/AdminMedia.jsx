// src/pages/admin/AdminMedia.jsx
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mediaService } from '../../services/mediaService';
import { Trash, Upload, X, FileText, Image as ImageIcon, ExternalLink, Loader } from 'lucide-react';

export default function AdminMedia() {
  useEffect(() => { document.title = 'Media Asset Management | Tawan Impex Portal'; }, []);

  const queryClient = useQueryClient();
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // inline confirm

  const { data: mediaItems = [], isLoading, error } = useQuery({
    queryKey: ['media'],
    queryFn: () => mediaService.getAll().then(res => res.data.data),
    staleTime: 2 * 60 * 1000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => mediaService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
    onError: (err) => {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  });

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      await mediaService.upload(file);
      queryClient.invalidateQueries({ queryKey: ['media'] });
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const onFileSelect = (e) => {
    handleFileUpload(e.target.files[0]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleDelete = (id) => {
    // Trigger inline confirmation instead of browser dialog
    setConfirmDeleteId(id);
  };

  const handleDeleteConfirm = (id) => {
    deleteMutation.mutate(id);
    setConfirmDeleteId(null);
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getMediaUrl = (url) => {
    if (url && url.startsWith('/')) {
      const backendBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');
      return `${backendBase}${url}`;
    }
    return url;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 32, color: '#EAE1D4', margin: 0 }}>Media Gallery</h1>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#A1A1A1', marginTop: 4 }}>Manage product specs, design assets, and upload client tech-packs.</p>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${dragOver ? '#D4AF37' : '#2A2A2D'}`,
          background: dragOver ? 'rgba(212,175,55,0.04)' : '#121214',
          borderRadius: 16,
          padding: '40px 24px',
          textAlign: 'center',
          marginBottom: 40,
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={() => document.getElementById('media-upload-input').click()}
      >
        <input
          id="media-upload-input"
          type="file"
          style={{ display: 'none' }}
          onChange={onFileSelect}
          disabled={uploading}
        />
        {uploading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Loader className="animate-spin" size={32} style={{ color: '#D4AF37' }} />
            <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 14, fontWeight: 700, color: '#D4AF37' }}>PROCESSING FILE UPLOAD...</span>
          </div>
        ) : (
          <div>
            <Upload size={32} style={{ color: '#A1A1A1', margin: '0 auto 12px' }} />
            <h3 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 16, color: '#EAE1D4', margin: '0 0 4px 0' }}>Drag & Drop Media Files</h3>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#A1A1A1', margin: 0 }}>Supports JPG, PNG, PDF, and Adobe Illustrator files (Max 10MB)</p>
          </div>
        )}
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
          <Loader className="animate-spin" size={36} style={{ color: '#D4AF37' }} />
        </div>
      ) : mediaItems.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 24px',
          background: '#121214',
          borderRadius: 16,
          border: '1px solid #2A2A2D',
          color: '#A1A1A1',
          fontFamily: 'Inter,sans-serif'
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📁</div>
          <p style={{ margin: 0 }}>No media files have been uploaded to the database yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
          {mediaItems.map((item) => {
            const isImage = /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(item.altText || item.filename || '');
            const displayName = item.altText || item.filename || item.publicId || 'Untitled';
            const fullUrl = getMediaUrl(item.url);

            return (
              <div
                key={item._id}
                style={{
                  background: '#121214',
                  border: '1px solid #2A2A2D',
                  borderRadius: 16,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="card-dark"
              >
                {/* Preview Thumbnail */}
                <div
                  style={{
                    height: 140,
                    background: '#0F0F10',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    borderBottom: '1px solid #242427'
                  }}
                  onClick={() => setPreviewItem(item)}
                >
                  {isImage ? (
                    <img src={fullUrl} alt={item.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <FileText size={48} style={{ color: '#D4AF37' }} />
                  )}
                </div>

                {/* Details */}
                <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontFamily: 'Montserrat,sans-serif',
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#EAE1D4',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginBottom: 4
                    }}
                    title={displayName}
                  >
                    {displayName}
                  </div>
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#8E8E93', marginBottom: 16 }}>
                    {item.size ? formatSize(item.size) : '—'}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto', borderTop: '1px solid #242427', paddingTop: 12 }}>
                    <a
                      href={fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '6px 10px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid #2A2A2D',
                        borderRadius: 8,
                        color: '#EAE1D4',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 11,
                        fontFamily: 'Montserrat,sans-serif',
                        fontWeight: 700,
                        textDecoration: 'none',
                        flex: 1,
                        justifyContent: 'center'
                      }}
                    >
                      <ExternalLink size={11} /> OPEN
                    </a>
                    {confirmDeleteId === item._id ? (
                      // Inline two-step confirmation
                      <>
                        <span style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'#D72638', display:'flex', alignItems:'center' }}>Sure?</span>
                        <button
                          onClick={() => handleDeleteConfirm(item._id)}
                          disabled={deleteMutation.isPending}
                          style={{ padding:'6px 10px', background:'rgba(215,38,56,0.85)', border:'1px solid rgba(215,38,56,0.6)', borderRadius:8, color:'#fff', cursor:'pointer', fontSize:11, fontFamily:'Montserrat,sans-serif', fontWeight:700 }}
                        >
                          {deleteMutation.isPending ? '...' : 'Yes'}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          style={{ padding:'6px 10px', background:'rgba(255,255,255,0.05)', border:'1px solid #2A2A2D', borderRadius:8, color:'#A1A1A1', cursor:'pointer', fontSize:11 }}
                        >
                          No
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deleteMutation.isPending}
                        style={{
                          padding: '6px 10px',
                          background: 'rgba(198,63,71,0.1)',
                          border: '1px solid rgba(198,63,71,0.2)',
                          borderRadius: 8,
                          color: '#C63F47',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 11,
                          fontFamily: 'Montserrat,sans-serif',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                        title="Delete asset"
                      >
                        <Trash size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div className="modal-backdrop" onClick={() => setPreviewItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 700 }}>
            <div style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2A2A2D' }}>
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 16, color: '#EAE1D4' }}>{previewItem.filename}</div>
              <button onClick={() => setPreviewItem(null)} style={{ background: 'none', border: 'none', color: '#A1A1A1', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: 24, background: '#0F0F10', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
              {/\.(jpeg|jpg|gif|png|webp|svg)$/i.test(previewItem.filename) ? (
                <img src={getMediaUrl(previewItem.url)} alt={previewItem.filename} style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }} />
              ) : (
                <div style={{ textAlign: 'center', color: '#A1A1A1' }}>
                  <FileText size={72} style={{ color: '#D4AF37', margin: '0 auto 16px' }} />
                  <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14 }}>Preview is unavailable for non-image files.</p>
                  <a
                    href={getMediaUrl(previewItem.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ display: 'inline-flex', marginTop: 16 }}
                  >
                    DOWNLOAD SPECIFICATION FILE
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
