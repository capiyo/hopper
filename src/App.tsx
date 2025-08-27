import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import  {Provider} from 'react-redux'
import Index from "./pages/Index";
import Inda from "./pages/Inda";

import NotFound from "./pages/NotFound";
import { reducers } from './components/ReduxPages/reducers';
import { Context } from './components/ContextProvider/Context';
import {store} from "./components/ReduxPages/reducers/store.js"
import { Chats } from "./components/Case/Chats.js";
import { JobDetails } from "./components/Case/JobDetails.js";



const queryClient = new QueryClient();
 

const App = () => (
    <Provider store={store}>
      <Context>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path='/current-job/:id' element={<JobDetails/>}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </Context>
  </Provider>
);

export default App;
