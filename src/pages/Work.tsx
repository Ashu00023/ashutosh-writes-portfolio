const WorkCard = ({ item }: { item: WorkItem }) => (
  <article
    className="group flex flex-col rounded-xl bg-background border border-border/60 overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full"
    onMouseEnter={() => prefetchOne(item.liveUrl)}
    onTouchStart={() => prefetchOne(item.liveUrl)}
  >
    <div className="relative overflow-hidden bg-muted aspect-[16/9] flex items-center justify-center">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-col flex-1 p-6">
      <span className="self-start text-[10px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-md uppercase tracking-[0.15em] mb-4">
        {item.niche}
      </span>
      <h3 className="text-lg font-bold text-foreground tracking-tight leading-snug mb-3">
        {item.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{item.summary}</p>
      <div className="flex flex-wrap gap-3">
        
          href={item.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-foreground text-background text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-accent transition-colors duration-200"
        >
          View Live Article <ArrowUpRight size={15} />
        </a>
        {isSpaRoute(item.transcriptHref) ? (
          <Link
            to={item.transcriptHref}
            className="inline-flex items-center gap-1.5 border border-border text-foreground text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <FileText size={14} /> Read Clean Transcript
          </Link>
        ) : (
          
            href={item.transcriptHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-border text-foreground text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <FileText size={14} /> Read Clean Transcript
          </a>
        )}
      </div>
      <p className="mt-5 pt-4 border-t border-border/60 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
        {item.format} · {item.stat}
      </p>
    </div>
  </article>
);
