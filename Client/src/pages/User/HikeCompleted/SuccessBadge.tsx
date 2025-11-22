import { Check, Sparkles } from "lucide-react"

export const SuccessBadge=()=>{
    return(
 <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>       
    )
}