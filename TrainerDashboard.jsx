
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TrainerDashboard() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", goal: "" });
  const [program, setProgram] = useState("");

  const addMember = () => {
    const newMember = { ...form, id: Date.now(), program: "" };
    setMembers([...members, newMember]);
    setForm({ name: "", age: "", goal: "" });
  };

  const assignProgram = () => {
    setMembers(
      members.map((m) =>
        m.id === selectedMember.id ? { ...m, program } : m
      )
    );
    setProgram("");
    setSelectedMember(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      <Card>
        <CardContent className="space-y-2 p-4">
          <h2 className="text-xl font-bold">Yeni Üye Ekle</h2>
          <Input
            placeholder="Ad Soyad"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Yaş"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <Input
            placeholder="Hedef (Kilo verme, kas kazanımı vb.)"
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
          />
          <Button onClick={addMember}>Ekle</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <h2 className="text-xl font-bold">Üyeler</h2>
          {members.map((member) => (
            <div
              key={member.id}
              className="border p-2 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedMember(member)}
            >
              <p className="font-semibold">{member.name}</p>
              <p>Yaş: {member.age} - Hedef: {member.goal}</p>
              <p className="text-sm text-gray-500">
                Program: {member.program || "Eklenmedi"}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedMember && (
        <Card className="md:col-span-2">
          <CardContent className="space-y-2 p-4">
            <h2 className="text-xl font-bold">
              {selectedMember.name} için Program Ekle
            </h2>
            <Textarea
              rows={5}
              placeholder="Antrenman programını buraya yaz..."
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            />
            <Button onClick={assignProgram}>Kaydet</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
