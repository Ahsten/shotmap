import { render, screen } from "@testing-library/react"
import Scorebug from "../components/scorebug/Scorebug"

it("should display a home/away teams with score/shots", () => {
    const away = {name: "Leafs", goals: 2, shots: 23}
    const home = {name: "Habs", goals: 3, shots: 24}
    render(<Scorebug home={home} away={away} />)
    expect(screen.getByText("Leafs")).toBeInTheDocument()
    expect(screen.getByText("Habs")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
    expect(screen.getByText("23 shots")).toBeInTheDocument()
    expect(screen.getByText("24 shots")).toBeInTheDocument()
})