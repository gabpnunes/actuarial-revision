export default function DesmosEmbed({ url, height = 400, title = 'Interactive graph' }) {
  return (
    <div className="my-6 overflow-hidden rounded-lg"
         style={{ border: '1px solid var(--border)' }}>
      <iframe src={url} title={title} width="100%" height={height}
              style={{ border: 'none', background: '#fff' }}
              allow="fullscreen" loading="lazy" />
    </div>
  )
}
