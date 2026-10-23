
resource "terraform_data" "student_api_lab" {
  input = "Student API infrastructure lab"
}

output "lab_message" {
  value = terraform_data.student_api_lab.output
}
