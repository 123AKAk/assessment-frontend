"use client";

import { useUsers } from "@/hooks/useUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { roles } from "@/lib/data";

export function RoleDistribution() {
  const { users } = useUsers();

  // Calculate role distribution
  const roleCounts = roles.map(role => {
    const count = users.filter(user => user.role.id === role.id).length;
    return {
      name: role.name,
      value: count,
      id: role.id,
    };
  });

  // Colors for the pie chart
  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

  return (
    <Card className="col-span-1 md:col-span-2 overflow-hidden transition duration-200 border hover:border-primary/20 hover:shadow-md">
      <CardHeader>
        <CardTitle>Role Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleCounts}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
                strokeWidth={2}
                stroke="hsl(var(--background))"
                animationDuration={500}
                label={({ name, value }) => `${value}`}
                labelLine={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 0.5 }}
              >
                {roleCounts.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value} user${value !== 1 ? 's' : ''}`,
                  name
                ]}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: "hsl(var(--foreground))"
                }}
              />
              <Legend 
                formatter={(value, entry, index) => (
                  <span style={{ color: "hsl(var(--foreground))" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}