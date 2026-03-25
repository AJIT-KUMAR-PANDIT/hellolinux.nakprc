import React from 'react';
import { motion } from 'motion/react';
import { Mic, History } from 'lucide-react';
import { MessageSquareIcon } from '../animate-ui/icons/message-square';
import { TerminalIcon } from '../animate-ui/icons/terminal';
import { UserIcon } from '../animate-ui/icons/user';

const BottomNav: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full flex justify-around py-4 bg-[#10141a]">
            <NavItem icon={<MessageSquareIcon size={24} />} label="Terminal" active />
            <NavItem icon={<Mic size={24} />} label="Voice" />
            <NavItem icon={<TerminalIcon size={24} />} label="Console" />
            <NavItem icon={<History size={24} />} label="Logs" />
            <NavItem icon={<UserIcon size={24} />} label="Account" />
        </nav>
    );
};

type NavProps = {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
};

const NavItem: React.FC<NavProps> = ({ icon, label, active }) => {
    return (
        <motion.div 
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center cursor-pointer ${active ? "text-green-400" : "text-gray-500"}`}
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