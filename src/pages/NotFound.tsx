import { Link } from 'react-router'
import { useLang } from '../i18n'
import { ToothMark } from '../components/Logo'

export default function NotFound() {
  const { t } = useLang()
  return (
    <section className="section grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <ToothMark className="mx-auto h-16 w-auto text-sage" strokeWidth={2.4} />
        <h1 className="mt-6 text-[clamp(2.4rem,6vw,4rem)]">{t.notFound.title}</h1>
        <p className="lead mx-auto mt-4 max-w-md">{t.notFound.lead}</p>
        <Link to="/" className="btn btn-pine mt-8">
          {t.notFound.home}
        </Link>
      </div>
    </section>
  )
}
