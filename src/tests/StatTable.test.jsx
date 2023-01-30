import { render, screen } from "@testing-library/react"
import StatTable from "../components/stat-table/StatTable"


it("should show a table with a name, G, A, P, TOI headers", ()=> {
    render(<StatTable />)
    expect(screen.getByTestId("name")).toBeInTheDocument()
    expect(screen.getByTestId("goals")).toBeInTheDocument()
    expect(screen.getByTestId("assists")).toBeInTheDocument()
    expect(screen.getByTestId("points")).toBeInTheDocument()
    expect(screen.getByTestId("time")).toBeInTheDocument()
})