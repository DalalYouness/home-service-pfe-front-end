import { useState, useEffect, useCallback } from "react";
import type { UserProfileMinDto, PageResponse } from "../types/admin";
import { authService } from "../services/auth.service";

export const useUsers = (initialPage = 0, initialSize = 10) => {
  const [usersPage, setUsersPage] =
    useState<PageResponse<UserProfileMinDto> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [size, setSize] = useState<number>(initialSize);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.getAllUsers(page, size);
      setUsersPage(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Erreur lors du chargement des utilisateurs",
      );
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users: usersPage?.content || [],
    totalPages: usersPage?.totalPages || 0,
    totalElements: usersPage?.totalElements || 0,
    currentPage: page,
    pageSize: size,
    loading,
    error,
    setPage,
    setSize,
    refetch: fetchUsers,
  };
};
