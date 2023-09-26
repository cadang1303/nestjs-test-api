/*
  Warnings:

  - You are about to drop the column `courses_id` on the `Section` table. All the data in the column will be lost.
  - Added the required column `course_id` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_courses_id_fkey";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "courses_id",
ADD COLUMN     "course_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
