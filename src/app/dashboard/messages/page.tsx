"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Trash2, Eye } from "lucide-react";

interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

export default function DashboardPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function fetchMessages() {
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setMessages(data.messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }


    useEffect(() => {
        fetchMessages();
    }, []);



    async function deleteMessage(id: string) {
        try {
            const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setMessages(messages.filter((msg) => msg._id !== id));
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    }

    function openModal(message: Message) {
        setSelectedMessage(message);
        setIsModalOpen(true);
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📩 Contact Messages</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <TableRow key={msg._id}>
                                <TableCell>{msg.name}</TableCell>
                                <TableCell>{msg.email}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => openModal(msg)}>
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => deleteMessage(msg._id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                No messages found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Modal for Viewing Message */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="p-6 rounded-lg"
                    >
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold">
                                📜 Message from {selectedMessage?.name}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                                {selectedMessage?.email}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="p-4 bg-gray-100 mt-3 dark:bg-gray-800 rounded-md">
                            <p>{selectedMessage?.message}</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={() => setIsModalOpen(false)} variant="outline">
                                Close
                            </Button>
                        </div>
                    </motion.div>
                </DialogContent>
            </Dialog>


        </div>
    );
}
