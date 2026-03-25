import React from 'react';
import { motion } from 'motion/react';
import { Mic, History, Box } from 'lucide-react';
import { MessageSquareIcon } from '../animate-ui/icons/message-square';
import { TerminalIcon } from '../animate-ui/icons/terminal';
import { UserIcon } from '../animate-ui/icons/user';

type BottomNavProps = {
    activeTab: string;
    onTabChange: (tab: string) => void;
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className="fixed bottom-0 left-0 w-full flex justify-around py-4 bg-[#10141a] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <NavItem icon={<MessageSquareIcon size={24} />} label="Terminal" active={activeTab === 'Terminal'} onClick={() => onTabChange('Terminal')} />
            <NavItem icon={<Mic size={24} />} label="Voice" active={activeTab === 'Voice'} onClick={() => onTabChange('Voice')} />
            <NavItem icon={<TerminalIcon size={24} />} label="Console" active={activeTab === 'Console'} onClick={() => onTabChange('Console')} />
            <NavItem icon={<Box size={24} />} label="Deploy" active={activeTab === 'Deploy'} onClick={() => onTabChange('Deploy')} />
            <NavItem icon={<History size={24} />} label="Logs" active={activeTab === 'Logs'} onClick={() => onTabChange('Logs')} />
            <NavItem icon={<UserIcon size={24} />} label="Account" active={activeTab === 'Account'} onClick={() => onTabChange('Account')} />
        </nav>
    );
};

type NavProps = {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
};

const NavItem: React.FC<NavProps> = ({ icon, label, active, onClick }) => {
    return (
        <motion.div 
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`flex flex-col items-center cursor-pointer ${active ? "text-green-400" : "text-gray-500 hover:text-gray-400"} transition-colors`}
        >
            <motion.div 
                initial={false}
                animate={{ color: active ? "#4ade80" : "#6b7280" }}
                transition={{ duration: 0.2 }}
                className="mb-1"
            >
                {icon}
            </motion.div>
            <span className="text-xs">{label}</span>
        </motion.div>
    );
};

export default BottomNav;