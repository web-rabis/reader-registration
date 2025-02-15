import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { RegistrationFormData } from "@/types/registration";
import { Dictionary } from "@/types/api";
import { dictionaryService } from "@/services/dictionary-service";
import { registrationService } from "@/services/registration-service";
import { useNavigate } from "react-router-dom";

interface RegistrationFormProps {
  mode?: "create" | "edit";
  registrationId?: number;
}

export function RegistrationForm({ mode = "create", registrationId }: RegistrationFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationFormData>({
    photo: null,
    iin: "",
    lastName: "",
    firstName: "",
    birthDate: "",
    address: "",
    phoneNumber: "",
    mobilePhone: "",
    email: "",
    gender: 0,
    education: 0,
    socialStatus: 0,
    specialization: 0,
    institute: 0,
    faculty: 0,
    course: "",
    workplace: "",
    position: "",
    academicDegree: 0,
  });

  const [dictionaries, setDictionaries] = useState<{
    genders: Dictionary[];
    educations: Dictionary[];
    socialStatuses: Dictionary[];
    specializations: Dictionary[];
    institutes: Dictionary[];
    faculties: Dictionary[];
    academicDegrees: Dictionary[];
  }>({
    genders: [],
    educations: [],
    socialStatuses: [],
    specializations: [],
    institutes: [],
    faculties: [],
    academicDegrees: [],
  });

  useEffect(() => {
    const loadDictionaries = async () => {
      try {
        const [
          gendersRes,
          educationsRes,
          socialStatusesRes,
          specializationsRes,
          institutesRes,
          facultiesRes,
          academicDegreesRes,
        ] = await Promise.all([
          dictionaryService.getGenders(),
          dictionaryService.getEducations(),
          dictionaryService.getSocialStatuses(),
          dictionaryService.getSpecializations(),
          dictionaryService.getInstitutes(),
          dictionaryService.getFaculties(),
          dictionaryService.getAcademicDegrees(),
        ]);

        setDictionaries({
          genders: gendersRes.data,
          educations: educationsRes.data,
          socialStatuses: socialStatusesRes.data,
          specializations: specializationsRes.data,
          institutes: institutesRes.data,
          faculties: facultiesRes.data,
          academicDegrees: academicDegreesRes.data,
        });
      } catch (error) {
        toast.error("Ошибка при загрузке справочников");
      }
    };

    loadDictionaries();
  }, []);

  useEffect(() => {
    if (mode === "edit" && registrationId) {
      const loadRegistration = async () => {
        try {
          const response = await registrationService.getById(registrationId);
          const { id, status, date, ...registrationData } = response.data;
          setFormData(registrationData);
        } catch (error) {
          toast.error("Ошибка при загрузке данных");
          navigate("/dashboard");
        }
      };
      loadRegistration();
    }
  }, [mode, registrationId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "edit" && registrationId) {
        await registrationService.update(registrationId, formData);
        toast.success("Данные успешно обновлены");
        navigate("/dashboard");
      } else {
        await registrationService.submit(formData);
        toast.success("Регистрация отправлена на рассмотрение");
        setFormData({
          photo: null,
          iin: "",
          lastName: "",
          firstName: "",
          birthDate: "",
          address: "",
          phoneNumber: "",
          mobilePhone: "",
          email: "",
          gender: 0,
          education: 0,
          socialStatus: 0,
          specialization: 0,
          institute: 0,
          faculty: 0,
          course: "",
          workplace: "",
          position: "",
          academicDegree: 0,
        });
      }
    } catch (error) {
      toast.error(mode === "edit" ? "Ошибка при обновлении данных" : "Ошибка при отправке формы");
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Регистрация читателя</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="photo">Фото</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="iin">ИИН</Label>
              <Input
                id="iin"
                value={formData.iin}
                onChange={(e) => setFormData({ ...formData, iin: e.target.value })}
                required
                maxLength={12}
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Фамилия</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">Имя</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Дата рождения</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                required
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Пол</Label>
              <Select
                value={formData.gender.toString()}
                onValueChange={(value) => setFormData({ ...formData, gender: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите пол" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.genders.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Образование</Label>
              <Select
                value={formData.education.toString()}
                onValueChange={(value) => setFormData({ ...formData, education: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите образование" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.educations.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialStatus">Социальный статус</Label>
              <Select
                value={formData.socialStatus.toString()}
                onValueChange={(value) => setFormData({ ...formData, socialStatus: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите социальный статус" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.socialStatuses.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Специальность</Label>
              <Select
                value={formData.specialization.toString()}
                onValueChange={(value) => setFormData({ ...formData, specialization: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите специальность" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.specializations.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="institute">Институт</Label>
              <Select
                value={formData.institute.toString()}
                onValueChange={(value) => setFormData({ ...formData, institute: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите институт" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.institutes.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">Факультет</Label>
              <Select
                value={formData.faculty.toString()}
                onValueChange={(value) => setFormData({ ...formData, faculty: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите факультет" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.faculties.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Курс</Label>
              <Input
                id="course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workplace">Место работы</Label>
              <Input
                id="workplace"
                value={formData.workplace}
                onChange={(e) => setFormData({ ...formData, workplace: e.target.value })}
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Должность</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="academicDegree">Ученая степень</Label>
              <Select
                value={formData.academicDegree.toString()}
                onValueChange={(value) => setFormData({ ...formData, academicDegree: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите ученую степень" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.academicDegrees.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Номер телефона</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobilePhone">Номер мобильного телефона</Label>
              <Input
                id="mobilePhone"
                type="tel"
                value={formData.mobilePhone}
                onChange={(e) => setFormData({ ...formData, mobilePhone: e.target.value })}
                required
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адрес</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="transition-all duration-200"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Отправить заявку
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
