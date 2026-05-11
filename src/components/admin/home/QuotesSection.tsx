import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Type,
} from "lucide-react";
import { Quote } from "../../../lib/adminService";

interface QuotesSectionProps {
  expanded: boolean;
  onToggle: () => void;
  quotes: Quote[];
  newQuote: string;
  onChangeNewQuote: (value: string) => void;
  onAddQuote: () => void;
  onDeleteQuote: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onCopy: (text: string) => void;
}

const QuotesSection = ({
  expanded,
  onToggle,
  quotes,
  newQuote,
  onChangeNewQuote,
  onAddQuote,
  onDeleteQuote,
  onToggleVisibility,
  onCopy,
}: QuotesSectionProps) => {
  const visibleCount = quotes.filter((q) => q.visible).length;
  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toISOString().slice(0, 10);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass rounded-2xl border border-border/50 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20">
            <Type className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-foreground">
              Motivational Quotes
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {quotes.length} quotes â€¢ {visibleCount} visible
            </p>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-secondary/50">
          {expanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="p-6 pt-0 space-y-4">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={newQuote}
                  onChange={(e) => onChangeNewQuote(e.target.value)}
                  placeholder="Enter a new motivational quote..."
                  className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 text-foreground placeholder:text-muted-foreground/50"
                  onKeyPress={(e) => e.key === "Enter" && onAddQuote()}
                />
              </div>
              <button
                onClick={onAddQuote}
                className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
              >
                <Plus className="w-4 h-4" />
                Add Quote
              </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {quotes.map((quote) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group p-4 rounded-xl border border-border/50 hover:border-amber-500/30 hover:bg-gradient-to-r hover:from-amber-500/5 hover:to-transparent transition-all duration-200"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`p-1 rounded-full ${
                            quote.visible ? "bg-green-500/20" : "bg-gray-500/20"
                          }`}
                        >
                          {quote.visible ? (
                            <Eye className="w-3 h-3 text-green-400" />
                          ) : (
                            <EyeOff className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            quote.visible
                              ? "bg-green-500/10 text-green-500"
                              : "bg-gray-500/10 text-gray-500"
                          }`}
                        >
                          {quote.visible ? "Visible" : "Hidden"}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/90 italic leading-relaxed">
                        &quot;{quote.text}&quot;
                      </p>
                      {quote.author && (
                        <p className="text-xs text-muted-foreground mt-3">
                          â€” {quote.author}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-4">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(quote.createdAt)}
                        </span>
                        <span className="text-xs px-2 py-1 bg-secondary/50 rounded">
                          {quote.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onCopy(quote.text)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                        title="Copy quote"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleVisibility(quote.id)}
                        className="p-2 text-muted-foreground hover:text-amber-500 hover:bg-secondary/50 rounded-lg transition-colors"
                        title={quote.visible ? "Hide quote" : "Show quote"}
                      >
                        {quote.visible ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => onDeleteQuote(quote.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 hover:bg-secondary/50 rounded-lg transition-colors"
                        title="Delete quote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {quotes.length === 0 && (
              <div className="text-center py-8">
                <Type className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No quotes added yet</p>
                <p className="text-sm text-muted-foreground/60 mt-1">
                  Add motivational quotes to inspire your visitors
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default QuotesSection;
