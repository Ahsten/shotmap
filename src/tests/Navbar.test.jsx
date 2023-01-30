import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from "../components/navbar/Navbar";
import userEvent from '@testing-library/user-event';



it("should show a title, games list, and date picker", ()=> {
    render(<Navbar />)
    expect(screen.getByText("NHL Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Games")).toBeInTheDocument()
    expect(screen.getByTestId("date-picker")).toBeInTheDocument()
})

it("should set date on change", () => { 
    render(<Navbar />)
    const dateElement = screen.getByTestId("date-picker")
    fireEvent.change(dateElement, {target: {value: "2022-12-12"}})
    expect(dateElement.value).toBe("2022-12-12")
})