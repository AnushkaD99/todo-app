import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export const NavBar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const user = "Anushka";

    return (
        <nav className="w-full px-4 md:px-8 py-4 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-gray-900">
                    TaskFlow
                </Link>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex gap-4 items-center">
                    {user ? (
                        <>
                            <span className="text-gray-700">Hello, {user}</span>
                            <Button onClick={() => { }}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button>Sign Up</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="flex flex-col space-y-4 mt-8 px-4 pt-4">
                                {user ? (
                                    <>
                                        <span className="text-gray-700">Hello, {user}</span>
                                        <Button variant="outline" onClick={() => {
                                            //   onLogout()
                                            setMenuOpen(false)
                                        }}>
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setMenuOpen(false)}>
                                            <Button variant="outline" className="w-full">Login</Button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setMenuOpen(false)}>
                                            <Button className="w-full">Sign Up</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}