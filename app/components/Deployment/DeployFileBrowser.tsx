import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Folder, 
  File, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Download, 
  FileCode,
  Box
} from 'lucide-react';

type FileNode = {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  count?: number;
  isOpen?: boolean;
  children?: FileNode[];
};

const initialFiles: FileNode[] = [
  {
    name: 'client',
    type: 'folder',
    isOpen: true,
    children: [
      { 
        name: 'assets', 
        type: 'folder', 
        count: 9, 
        isOpen: true,
        children: [
          { name: 'home-JLQNJKBo.js', type: 'file', size: '1.7 MB' },
          { name: 'entry.client-DtBb0jj4.js', type: 'file', size: '190 KB' },
          { name: 'root-B_xoLYis.css', type: 'file', size: '73 KB' },
          { name: 'chunk-UVKPFVEO.js', type: 'file', size: '125 KB' },
          { name: 'geist-latin.woff2', type: 'file', size: '28 KB' },
        ]
      },
      { name: 'favicon.ico', type: 'file', size: '14.7 KB' },
      { name: 'index.html', type: 'file', size: '2.4 KB' },
    ]
  },
  { name: 'netlify.toml', type: 'file', size: '0.4 KB' },
  { name: 'package.json', type: 'file', size: '1.2 KB' },
];

export default function DeployFileBrowser() {
  const [nodes, setNodes] = useState<FileNode[]>(initialFiles);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFolder = (path: string[]) => {
    const updateNodes = (list: FileNode[], currentPath: string[]): FileNode[] => {
      return list.map(node => {
        if (node.name === currentPath[0]) {
          if (currentPath.length === 1) {
            return { ...node, isOpen: !node.isOpen };
          }
          return { ...node, children: updateNodes(node.children || [], currentPath.slice(1)) };
        }
        return node;
      });
    };
    setNodes(updateNodes(nodes, path));
  };

  const renderNode = (node: FileNode, path: string[], level: number) => {
    const isVisible = node.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      (node.children?.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())));
    
    if (!isVisible && searchTerm) return null;

    const isFolder = node.type === 'folder';
    const Icon = isFolder ? (node.isOpen ? ChevronDown : ChevronRight) : File;
    const FolderIcon = isFolder ? Folder : File;

    return (
      <div key={node.name + level} className="w-full">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: level * 0.05 }}
          onClick={() => isFolder && toggleFolder([...path, node.name])}
          className={`group flex items-center justify-between py-2.5 px-3 rounded-xl transition-all cursor-pointer border border-transparent hover:bg-white/5 hover:border-white/10 ${level > 0 ? 'ml-6 border-l border-white/5 pl-6' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-5 h-5">
              {isFolder && <Icon size={16} className="text-gray-500 group-hover:text-green-400" />}
            </div>
            <div className={`p-1.5 rounded-lg ${isFolder ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-400'}`}>
              <FolderIcon size={16} />
            </div>
            <span className={`text-sm font-medium tracking-wide ${isFolder ? 'text-gray-200' : 'text-gray-300'}`}>
              {node.name}
            </span>
            {node.count !== undefined && (
              <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-gray-500 font-mono">
                {node.count} files
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
            {node.size && <span className="text-[11px] text-gray-500 font-mono">{node.size}</span>}
            <button className="p-1.5 rounded-lg bg-white/5 hover:bg-green-500/20 hover:text-green-400 border border-white/5 transition-all">
              <Download size={14} />
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {isFolder && node.isOpen && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {node.children.map(child => renderNode(child, [...path, node.name], level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0f18] text-gray-100 overflow-hidden pb-[88px]">
      
      {/* Header */}
      <header className="flex-none px-6 py-5 border-b border-white/5 bg-[#10141a]/90 backdrop-blur-md z-10 w-full flex flex-col gap-4 shadow-sm shadow-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-xl text-green-400">
               <Box size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent tracking-tight">
                Deploy Browser
              </h1>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-0.5">Production Artifacts</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Status</span>
                <span className="text-xs text-green-400 font-mono flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                   Synced
                </span>
             </div>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative flex items-center w-full max-w-4xl mx-auto">
          <Search size={16} className="absolute left-3 text-gray-500 z-10" />
          <input 
            type="text"
            placeholder="Search files in this deploy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500/50 focus:bg-[#1a202c] transition-all text-gray-200 placeholder-gray-600 shadow-inner"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 custom-scrollbar w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-1">
          {nodes.map(node => renderNode(node, [], 0))}
        </div>

        {searchTerm && nodes.every(n => !n.name.toLowerCase().includes(searchTerm.toLowerCase()) && !n.children?.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))) && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-600 uppercase tracking-widest text-xs text-center gap-4">
            <div className="p-4 bg-white/2 rounded-full border border-white/5">
                <FileCode size={32} className="opacity-20" />
            </div>
            No files match your search
          </div>
        )}
      </main>

    </div>
  );
}
